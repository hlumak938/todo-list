import React from 'react';
import { useUserStore } from '~store/user.store';
import UserForm from '~shared/components/UserForm/UserForm';
import { Button } from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';
import {
	backButtonStyle,
	buttonsStyle,
	emailVerificationBannerStyle,
	logoutButtonStyle,
	resendButtonStyle,
} from '~pages/profile/ProfilePage.styles';
import { updateUserSchema } from '~utils/validation';

const Profile: React.FC = () => {
	const { logout, updateProfile, sendVerificationEmail, user } =
		useUserStore();
	const navigate = useNavigate();

	const handleSubmit = async (data: {
		name: string;
		oldPassword: string;
		newPassword: string;
	}): Promise<void> => {
		await updateProfile(data);
		alert('User updated successfully!');
	};

	const resendVerificationEmail = async (): Promise<void> => {
		try {
			await sendVerificationEmail({ id: user.id, email: user.email });
			alert('Verification email sent successfully!');
		} catch (error) {
			console.error('Failed to resend verification email:', error);
		}
	};

	return (
		<div>
			{!user?.isVerified && (
				<div className={emailVerificationBannerStyle}>
					<p>
						Your email is not verified. Please verify your email to
						access all features.
					</p>
					<Button
						className={resendButtonStyle}
						onClick={resendVerificationEmail}
					>
						Resend Verification Email
					</Button>
				</div>
			)}

			<UserForm
				schema={updateUserSchema}
				title="My Profile"
				fields={[
					{
						name: 'name',
						type: 'text',
						placeholder: 'Name',
					},
					{
						name: 'oldPassword',
						type: 'password',
						placeholder: 'Old Password',
					},
					{
						name: 'newPassword',
						type: 'password',
						placeholder: 'New Password',
					},
				]}
				onSubmit={handleSubmit}
				submitText="Update user"
				extraContent={
					<div className={buttonsStyle}>
						<Button
							className={backButtonStyle}
							onClick={() => navigate(-1)}
						>
							Back
						</Button>
						<Button
							className={logoutButtonStyle}
							onClick={logout}
							intent="danger"
						>
							Logout
						</Button>
					</div>
				}
				defaultValues={{
					name: user?.name,
				}}
			/>
		</div>
	);
};

export default Profile;
