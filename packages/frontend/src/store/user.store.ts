import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import UserService from '~shared/services/user.service';
import { AuthUser, IUser, UpdateUserPayload } from '~shared/services/types';
import { STORAGE_KEYS } from '~shared/keys';

interface UserState {
	token: string | null;
	user: IUser | null;
	isAuthenticated: boolean;
	login: (data: AuthUser) => Promise<void>;
	register: (data: AuthUser) => Promise<void>;
	sendVerificationEmail: (data: {
		id: number;
		email: string;
	}) => Promise<void>;
	verifyEmail: (token: string) => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	resetPassword: (data: {
		newPassword: string;
		confirmPassword: string;
		token: string;
	}) => Promise<void>;
	updateProfile: (data: UpdateUserPayload) => Promise<void>;
	logout: () => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => {
			let logoutTimer: ReturnType<typeof setTimeout> | null = null;

			const clearState = (): void => {
				localStorage.clear();
				localStorage.removeItem(STORAGE_KEYS.TOKEN);
				set({ token: null, user: null, isAuthenticated: false });
			};

			const scheduleLogout = (token: string): void => {
				try {
					const payload = JSON.parse(atob(token.split('.')[1])); // Декодируем payload
					const expirationTime = payload.exp * 1000; // Время истечения срока действия токена
					const timeLeft = expirationTime - Date.now(); // Время до истечения

					if (timeLeft > 0) {
						logoutTimer = setTimeout(() => {
							clearState();
						}, timeLeft);
					} else {
						clearState();
					}
				} catch (error) {
					console.error('Invalid token format', error);
				}
			};

			const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
			if (token && JSON.parse(token).state.token) {
				scheduleLogout(token);
			}

			return {
				token: null,
				user: null,
				isAuthenticated: false,

				async login(data): Promise<void> {
					try {
						const response = await UserService.login(data);
						const { token, user } = response.data;
						if (token) {
							set({ token, user, isAuthenticated: true });
							scheduleLogout(token);
						}
					} catch (error) {
						throw new Error('Invalid email or password');
					}
				},

				async register(data): Promise<void> {
					try {
						await UserService.register(data);
					} catch (error) {
						throw new Error('This e-mail is taken');
					}
				},

				async sendVerificationEmail(data): Promise<void> {
					try {
						await UserService.sendVerificationEmail(data);
					} catch (error) {
						throw new Error(error.message);
					}
				},

				async verifyEmail(token): Promise<void> {
					await UserService.verifyEmail(token);
					set({
						user: {
							...get().user,
							isVerified: true,
						},
					});
				},

				async forgotPassword(email): Promise<void> {
					try {
						await UserService.forgotPassword({ email });
					} catch (error) {
						throw new Error('This email does not exist');
					}
				},

				async resetPassword(data): Promise<void> {
					await UserService.resetPassword(data);
				},

				async updateProfile(data): Promise<void> {
					try {
						const response = await UserService.updateProfile(data);
						set({
							user: {
								...get().user,
								name: response.data.name,
							},
						});
					} catch (error) {
						throw new Error('Wrong old password');
					}
				},

				logout(): void {
					if (logoutTimer) clearTimeout(logoutTimer);
					clearState();
				},
			};
		},
		{
			name: STORAGE_KEYS.TOKEN,
			partialize: (state) => ({
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);
