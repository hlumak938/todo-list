import { COLORS, THEME } from '~shared/styles';
import { css, keyframes } from '@emotion/css';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const loaderContainer = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	color: ${COLORS.primary};
	font-size: ${THEME.fontSizes.large};
	font-weight: bold;

	span {
		margin-top: ${THEME.spacing.medium};
	}
`;

export const spinnerStyle = css`
	width: 50px;
	height: 50px;
	border: 6px solid ${COLORS.primaryLight};
	border-top: 6px solid ${COLORS.primary};
	border-radius: 50%;
	animation: ${spinAnimation} 1s linear infinite;
`;
