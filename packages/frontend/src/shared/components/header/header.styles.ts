import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const headerContainer = css`
	display: flex;
	flex-direction: column;
	padding: ${THEME.spacing.medium};
	background-color: ${COLORS.background};
	border-bottom: 1px solid ${COLORS.tableBorder};
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	.profile {
		display: flex;
		justify-content: flex-end;
		margin-bottom: ${THEME.spacing.medium};
	}

	.search-filter {
		display: flex;
		align-items: center;
		justify-content: space-between;

		@media (max-width: 460px) {
			flex-direction: column;
			gap: ${THEME.spacing.verySmall};
		}
	}
`;

export const selectorsContainer = css`
	display: flex;
	gap: ${THEME.spacing.medium};
`;

export const searchButton = css`
	cursor: pointer;
	color: ${COLORS.primary};
	margin: ${THEME.spacing.verySmall};
	transition: color 0.3s ease;

	&:hover {
		color: ${COLORS.primaryHover};
	}
`;

export const profileButtonStyle = css`
	background-color: ${COLORS.primary};
	color: ${COLORS.buttonText};
	border-radius: 6px;
	padding: ${THEME.spacing.small} ${THEME.spacing.medium};
	font-size: ${THEME.fontSizes.medium};
	font-weight: bold;
	transition:
		background-color 0.3s ease,
		color 0.3s ease;

	&:hover {
		background-color: ${COLORS.primaryHover};
		color: ${COLORS.primaryHover};
	}
`;

export const inputGroupStyle = css`
	input {
		background-color: ${COLORS.backgroundDark};
		color: ${COLORS.textPrimary};
		border: 1px solid ${COLORS.tableBorder};
		padding: ${THEME.spacing.small};
		border-radius: 6px;
		transition: border-color 0.3s ease;

		&:focus {
			border-color: ${COLORS.primary};
			outline: none;
		}
	}
`;
