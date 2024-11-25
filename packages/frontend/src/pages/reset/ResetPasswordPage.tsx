import React from 'react';
import { useUserStore } from '~store/user.store';
import { useLocation, useNavigate } from 'react-router-dom';
import UserForm from '~shared/components/UserForm/UserForm';
import { resetPasswordSchema } from '~utils/validation';
import { PUBLIC_ROUTER_KEYS } from '~shared/keys';

const ResetPasswordPage: React.FC = () => {
	const { resetPassword } = useUserStore();
	const location = useLocation();
	const navigate = useNavigate();

	const handleSubmit = async (data: {
		newPassword: string;
		confirmPassword: string;
	}): Promise<void> => {
		const searchParams = new URLSearchParams(location.search);
		await resetPassword({ ...data, token: searchParams.get('token') });
		navigate(PUBLIC_ROUTER_KEYS.LOGIN);
	};

	return (
		<UserForm
			schema={resetPasswordSchema}
			title="Reset password"
			fields={[
				{
					name: 'newPassword',
					type: 'password',
					placeholder: 'Password',
				},
				{
					name: 'confirmPassword',
					type: 'password',
					placeholder: 'Confirm password',
				},
			]}
			onSubmit={handleSubmit}
			submitText="Change password"
		/>
	);
};

export default ResetPasswordPage;
