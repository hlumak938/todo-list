import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const detailsContainerStyle = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	padding: ${THEME.spacing.large};
	background-color: ${COLORS.backgroundDark};
	color: ${COLORS.textPrimary};
`;

export const titleStyle = css`
	font-size: ${THEME.fontSizes.header};
	margin-bottom: ${THEME.spacing.medium};
	text-align: center;
	color: ${COLORS.textPrimary};
`;

export const descriptionStyle = css`
	font-size: ${THEME.fontSizes.medium};
	margin-bottom: ${THEME.spacing.medium};
	text-align: center;
	max-width: 600px;
	color: ${COLORS.textSecondary};
`;

export const switchStyle = css`
	margin-bottom: ${THEME.spacing.medium};
`;

export const buttonContainerStyle = css`
	display: flex;
	justify-content: center;
	gap: ${THEME.spacing.medium};
`;

export const backButtonStyle = css`
	background-color: ${COLORS.primaryDark};
	color: ${COLORS.textPrimary};
	border-radius: 8px;
	padding: 0.5rem 1rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

	&:hover {
		background-color: ${COLORS.primaryHoverDark};
	}
`;
