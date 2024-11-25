import React from 'react';
import { useUserStore } from '~store/user.store';
import { Link } from 'react-router-dom';
import UserForm from '~shared/components/UserForm/UserForm';
import { forgotPasswordSchema } from '~utils/validation';
import { PUBLIC_ROUTER_KEYS } from '~shared/keys';

const ForgotPasswordPage: React.FC = () => {
	const { forgotPassword } = useUserStore();

	const handleSubmit = (data: { email: string }): void => {
		forgotPassword(data.email)
			.then((_) => alert('We sent you reset message'))
			.catch((err) => alert(err));
	};

	return (
		<UserForm
			schema={forgotPasswordSchema}
			title="Forgot password"
			fields={[
				{
					name: 'email',
					type: 'text',
					placeholder: 'Email',
				},
			]}
			onSubmit={handleSubmit}
			submitText="Reset password"
			extraContent={
				<>
					<Link to={PUBLIC_ROUTER_KEYS.LOGIN}>Back to login</Link>
					<Link to={PUBLIC_ROUTER_KEYS.REGISTER}>
						Don't have an account?
					</Link>
				</>
			}
		/>
	);
};

export default ForgotPasswordPage;
