import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const pageContainerStyle = css`
	background-color: ${COLORS.background};
	color: ${COLORS.tableData};
	min-height: 100vh;
	padding: ${THEME.spacing.large};
`;
