import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const buttonsStyle = css`
	display: flex;
	justify-content: center;
	gap: ${THEME.spacing.large};
	margin-top: ${THEME.spacing.medium};
`;

export const resendButtonStyle = css`
	background-color: ${COLORS.primary};
	color: ${COLORS.buttonText};
	border-radius: 6px;
	padding: ${THEME.spacing.small};
	font-size: ${THEME.fontSizes.small};
	font-weight: bold;
	width: 20%;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${COLORS.primaryHover};
	}

	&:disabled {
		background-color: ${COLORS.buttonHover};
	}
`;

export const logoutButtonStyle = css`
	background-color: ${COLORS.danger};
	color: ${COLORS.textPrimary};
	padding: 0.5rem 1.5rem;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${COLORS.dangerHover};
	}
`;

export const backButtonStyle = css`
	background-color: ${COLORS.primaryDark};
	color: ${COLORS.textPrimary};
	padding: 0.5rem 1.5rem;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${COLORS.primaryHoverDark};
	}
`;

export const emailVerificationBannerStyle = css`
	background-color: #ffe3e3;
	border: 1px solid #ffcccc;
	border-radius: 8px;
	padding: 1rem;
	margin-bottom: 1rem;
	text-align: center;
	color: #d9534f;
`;
