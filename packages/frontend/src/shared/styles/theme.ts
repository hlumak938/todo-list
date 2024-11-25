import { css } from '@emotion/css';
import { COLORS } from '~shared/styles/colors';

export const THEME = Object.freeze({
	spacing: {
		verySmall: '0.4rem',
		small: '0.5rem',
		medium: '0.9rem',
		large: '1.3rem',
		veryLarge: '1.8rem',
	},
	fontSizes: {
		small: '14px',
		medium: '16px',
		large: '18px',
		header: '20px',
	},
});

export const errorText = css`
	color: ${COLORS.danger};
	font-size: ${THEME.fontSizes.small};
	margin: ${THEME.spacing.small} 0;
	text-align: left;
`;
