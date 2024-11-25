import { createBrowserRouter } from 'react-router-dom';
import App from '~modules/app/app.module';
import { PRIVATE_ROUTER_KEYS, PUBLIC_ROUTER_KEYS } from '~shared/keys';
import { TodoDetailsPage } from '~pages/details/TodoDetailsPage';
import EditTodoPage from '../pages/edit/EditTodoPage';
import LoginPage from '~pages/login/LoginPage';
import PrivateRoute from '~router/PrivateRoute';
import RegisterPage from '~pages/register/RegisterPage';
import ProfilePage from '~pages/profile/ProfilePage';
import ForgotPasswordPage from '~pages/forgot/ForgotPasswordPage';
import ResetPasswordPage from '~pages/reset/ResetPasswordPage';
import EmailVerificationPage from '~pages/verify/EmailVerificationPage';

export const router = createBrowserRouter(
	[
		{
			path: PUBLIC_ROUTER_KEYS.LOGIN,
			Component: LoginPage,
		},
		{
			path: PUBLIC_ROUTER_KEYS.REGISTER,
			Component: RegisterPage,
		},
		{
			path: PUBLIC_ROUTER_KEYS.VERIFY_EMAIL,
			Component: EmailVerificationPage,
		},
		{
			path: PUBLIC_ROUTER_KEYS.FORGOT_PASSWORD,
			Component: ForgotPasswordPage,
		},
		{
			path: PUBLIC_ROUTER_KEYS.RESET_PASSWORD,
			Component: ResetPasswordPage,
		},
		{
			Component: PrivateRoute,
			children: [
				{
					path: PRIVATE_ROUTER_KEYS.TODOS,
					Component: App,
				},
				{
					path: PRIVATE_ROUTER_KEYS.TODO_DETAILS,
					Component: TodoDetailsPage,
				},
				{
					path: PRIVATE_ROUTER_KEYS.EDIT,
					Component: EditTodoPage,
				},
				{
					path: PRIVATE_ROUTER_KEYS.PROFILE,
					Component: ProfilePage,
				},
			],
		},
	],
	{
		future: {
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_relativeSplatPath: true,
			v7_skipActionErrorRevalidation: true,
		},
	},
);
