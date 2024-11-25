import { css } from '@emotion/css';
import { COLORS } from '~shared/styles';

export const containerStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: ${COLORS.backgroundDark};
`;

export const cardStyle = css`
	padding: 2rem;
	text-align: center;
	max-width: 400px;
	width: 100%;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	background-color: ${COLORS.background};
`;

export const headingStyle = css`
	margin-bottom: 1rem;
	font-size: 1.5rem;
	color: ${COLORS.textPrimary};
`;

export const messageStyle = css`
	margin-bottom: 2rem;
	color: ${COLORS.textSecondary};
`;
