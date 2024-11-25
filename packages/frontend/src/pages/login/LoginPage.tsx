import React from 'react';
import { useUserStore } from '~store/user.store';
import { Link, useNavigate } from 'react-router-dom';
import UserForm from '~shared/components/UserForm/UserForm';
import { loginSchema } from '~utils/validation';
import { PRIVATE_ROUTER_KEYS } from '~shared/keys';

const LoginPage: React.FC = () => {
	const { login } = useUserStore();
	const navigate = useNavigate();

	const handleSubmit = (data: { email: string; password: string }): void => {
		console.log('LOGIN!');
		login(data)
			.then((_) => navigate(PRIVATE_ROUTER_KEYS.TODOS))
			.catch((err) => alert(err));
	};

	return (
		<UserForm
			schema={loginSchema}
			title="Login"
			fields={[
				{
					name: 'email',
					type: 'text',
					placeholder: 'Email',
				},
				{
					name: 'password',
					type: 'password',
					placeholder: 'Password',
				},
			]}
			onSubmit={handleSubmit}
			submitText="Login"
			extraContent={
				<>
					<Link to="/forgot-password">Forgot Password?</Link>
					<Link to="/register">Don't have an account?</Link>
				</>
			}
		/>
	);
};

export default LoginPage;
