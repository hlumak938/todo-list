import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const formStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: ${COLORS.background};
`;

export const formContainerStyle = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.spacing.medium};
	padding: ${THEME.spacing.large};
	background-color: ${COLORS.backgroundDark};
	border: 1px solid ${COLORS.borderDark};
	border-radius: 12px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	width: 100%;
	max-width: 500px;
	margin: 0 auto;
`;

export const cardStyle = css`
	max-width: 450px;
	padding: ${THEME.spacing.large};
	text-align: center;
	background-color: ${COLORS.backgroundDark};
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 100%;

	& h2 {
		padding-bottom: ${THEME.spacing.large};
		font-size: ${THEME.fontSizes.large};
		color: ${COLORS.textPrimary};
	}
`;

export const extraContentStyle = css`
	margin-top: ${THEME.spacing.medium};
	text-align: center;
	color: ${COLORS.textSecondary};

	& a {
		color: ${COLORS.primary};
		text-decoration: none;
		font-weight: bold;
		outline: none;
		transition: color 0.3s ease;

		&:hover {
			color: ${COLORS.primaryHover};
		}
	}
`;

export const inputGroupStyle = css`
	margin-bottom: ${THEME.spacing.small};

	.bp5-input {
		background-color: ${COLORS.inputBackground};
		border-radius: 6px;
		padding: ${THEME.spacing.large};
		color: ${COLORS.textPrimary};
		transition: border-color 0.3s ease;

		&:focus {
			border-color: ${COLORS.primary};
		}

		&::placeholder {
			color: ${COLORS.textSecondary};
		}
	}
`;

export const buttonStyle = css`
	background-color: ${COLORS.primary};
	color: ${COLORS.buttonText};
	border-radius: 6px;
	padding: ${THEME.spacing.medium};
	font-size: ${THEME.fontSizes.medium};
	font-weight: bold;
	width: 100%;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${COLORS.primaryHover};
	}

	&:disabled {
		background-color: ${COLORS.buttonHover};
	}
`;

export const formGroupStyle = css`
	margin-bottom: ${THEME.spacing.large};
`;
