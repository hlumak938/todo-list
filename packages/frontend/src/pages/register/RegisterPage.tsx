import React from 'react';
import { useUserStore } from '~store/user.store';
import { Link, useNavigate } from 'react-router-dom';
import UserForm from '~shared/components/UserForm/UserForm';
import { registerSchema } from '~utils/validation';
import { PUBLIC_ROUTER_KEYS } from '~shared/keys';

const Register: React.FC = () => {
	const { register: registerUser } = useUserStore();
	const navigate = useNavigate();

	const handleSubmit = (data: {
		email: string;
		password: string;
		confirmPassword: string;
	}): void => {
		if (data.password !== data.confirmPassword) {
			alert('Passwords do not match!');
			return;
		}
		registerUser(data)
			.then((_) => {
				navigate(PUBLIC_ROUTER_KEYS.LOGIN);
				alert('Registered successfully!');
			})
			.catch((err) => alert(err));
	};

	return (
		<UserForm
			schema={registerSchema}
			title="Register"
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
				{
					name: 'confirmPassword',
					type: 'password',
					placeholder: 'Confirm Password',
				},
			]}
			onSubmit={handleSubmit}
			submitText="Register"
			extraContent={
				<>
					<Link to={PUBLIC_ROUTER_KEYS.LOGIN}>Back to login</Link>
				</>
			}
		/>
	);
};

export default Register;
