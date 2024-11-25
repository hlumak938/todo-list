import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

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

export const inputsStyle = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.spacing.small};
	margin-bottom: ${THEME.spacing.medium};

	input {
		padding: ${THEME.spacing.small};
		background-color: ${COLORS.inputBackground};
		color: ${COLORS.textPrimary};
		border: 1px solid ${COLORS.borderDark};
		border-radius: 6px;
		font-size: ${THEME.fontSizes.medium};
		transition: border-color 0.3s;

		&:focus {
			border-color: ${COLORS.primary};
			box-shadow: 0 0 0 3px ${COLORS.primaryLight};
		}

		&::placeholder {
			color: ${COLORS.textSecondary};
		}
	}
`;

export const buttonContainerStyle = css`
	display: flex;
	justify-content: flex-end;
	gap: ${THEME.spacing.medium};

	.bp5-button {
		padding: ${THEME.spacing.small} ${THEME.spacing.medium};
		font-size: ${THEME.fontSizes.medium};
		border-radius: 6px;
		transition:
			background-color 0.3s,
			color 0.3s;

		&:first-of-type {
			background-color: ${COLORS.dangerDark};
			color: ${COLORS.textPrimary};
		}

		&:first-of-type:hover {
			background-color: ${COLORS.dangerHoverDark};
			color: ${COLORS.textPrimary};
		}

		&:last-of-type {
			background-color: ${COLORS.primaryDark};
			color: ${COLORS.textPrimary};
		}

		&:last-of-type:hover {
			background-color: ${COLORS.primaryHoverDark};
			color: ${COLORS.textPrimary};
		}
	}
`;
