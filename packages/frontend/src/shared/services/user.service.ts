import HttpService from '~shared/services/http.service';
import { AxiosResponse } from 'axios';
import { AuthUser, IUser, UpdateUserPayload } from '~shared/services/types';

class UserService extends HttpService {
	constructor() {
		super();
	}

	login(
		data: AuthUser,
	): Promise<AxiosResponse<{ token: string; user: IUser }>> {
		return this.post({ url: 'user/login', data }, false);
	}

	register(data: AuthUser): Promise<AxiosResponse<IUser>> {
		return this.post({ url: 'user/register', data }, false);
	}

	forgotPassword(data: { email: string }): Promise<AxiosResponse<string>> {
		return this.post({ url: 'user/forgot-password', data }, false);
	}

	sendVerificationEmail(data: {
		id: number;
		email: string;
	}): Promise<AxiosResponse<string>> {
		return this.post({ url: 'user/verify-email', data }, false);
	}

	verifyEmail(token: string): Promise<AxiosResponse<string>> {
		return this.get({ url: `user/verify-email?token=${token}` }, false);
	}

	resetPassword(data: {
		newPassword: string;
		confirmPassword: string;
		token: string;
	}): Promise<AxiosResponse<string>> {
		return this.post({ url: 'user/reset-password', data }, false);
	}

	updateProfile(data: UpdateUserPayload): Promise<AxiosResponse<IUser>> {
		return this.put({ url: 'user/profile', data });
	}
}

export default new UserService();
