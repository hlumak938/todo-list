import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const buttonGroupStyle = css`
	display: flex;
	justify-content: center;
	gap: ${THEME.spacing.small};
	padding: ${THEME.spacing.small};
	border-radius: 8px;
`;

export const buttonStyle = css`
	border-radius: 6px;
	padding: ${THEME.spacing.small} ${THEME.spacing.medium};
	font-size: ${THEME.fontSizes.medium};
	transition: all 0.3s ease-in-out;
	box-shadow: none;
	border: 1px solid transparent;

	@media (max-width: 425px) {
		padding: ${THEME.spacing.verySmall} ${THEME.spacing.small};
		font-size: ${THEME.fontSizes.small};
	}

	&.view {
		background-color: ${COLORS.primary};
		color: ${COLORS.buttonText};
	}

	&.view:hover {
		background-color: ${COLORS.primaryHover};
		border-color: ${COLORS.primaryHover};
		color: ${COLORS.buttonHoverText};
	}

	&.edit {
		background-color: ${COLORS.success};
		color: ${COLORS.buttonText};
	}

	&.edit:hover {
		background-color: ${COLORS.successHover};
		border-color: ${COLORS.successHover};
		color: ${COLORS.buttonHoverText};
	}

	&.delete {
		background-color: ${COLORS.danger};
		color: ${COLORS.buttonText};
	}

	&.delete:hover {
		background-color: ${COLORS.dangerHover};
		border-color: ${COLORS.dangerHover};
		color: ${COLORS.buttonHoverText};
	}
`;
