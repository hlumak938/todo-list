import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const modalContainerStyle = css`
	background-color: ${COLORS.backgroundDark};

	.bp5-dialog {
		background-color: ${COLORS.backgroundDark};
		border-radius: 12px;
		padding: ${THEME.spacing.large};
		max-width: 500px;
		margin: auto;
		color: ${COLORS.textPrimary};
	}

	.bp5-dialog-header {
		background-color: ${COLORS.backgroundDark};
		padding: ${THEME.spacing.medium};
	}

	.bp5-heading {
		color: ${COLORS.buttonText};
		font-size: ${THEME.fontSizes.large};
	}

	.bp5-dialog-body {
		padding: ${THEME.spacing.medium};
		display: flex;
		flex-direction: column;
		gap: ${THEME.spacing.small};
	}

	.bp5-button {
		background-color: ${COLORS.primary};
		border-radius: 6px;
		font-size: ${THEME.fontSizes.medium};
		font-weight: bold;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;

		svg {
			fill: ${COLORS.buttonText};
		}

		&:hover {
			background-color: ${COLORS.primaryHover};
			color: ${COLORS.buttonHoverText};
		}
	}

	.bp5-dialog-footer {
		display: flex;
		justify-content: flex-end;
		gap: ${THEME.spacing.medium};
		padding: ${THEME.spacing.medium};
	}

	.bp5-dialog-close-button {
		color: ${COLORS.danger};
	}
`;
