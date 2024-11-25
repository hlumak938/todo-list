import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from '@blueprintjs/core';
import { useUserStore } from '~store/user.store';
import { PRIVATE_ROUTER_KEYS } from '~shared/keys';
import {
	cardStyle,
	containerStyle,
	headingStyle,
	messageStyle,
} from '~pages/verify/EmailVerificationPage.style';

const EmailVerificationPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { verifyEmail } = useUserStore();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		verifyEmail(searchParams.get('token'));

		const timer = setTimeout(() => {
			navigate(PRIVATE_ROUTER_KEYS.TODOS);
		}, 5000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className={containerStyle}>
			<Card className={cardStyle}>
				<h2 className={headingStyle}>Email Verified Successfully!</h2>
				<p className={messageStyle}>
					Thank you for verifying your email. You will be redirected
					to the home page shortly.
				</p>
				<Button
					intent="primary"
					large
					onClick={() => navigate(PRIVATE_ROUTER_KEYS.TODOS)} // Manual redirect
				>
					Go to Home
				</Button>
			</Card>
		</div>
	);
};

export default EmailVerificationPage;
