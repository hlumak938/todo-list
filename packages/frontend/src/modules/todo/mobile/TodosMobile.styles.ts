import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const listItemStyle = css`
	background-color: ${COLORS.background};
	padding: ${THEME.spacing.medium};
	margin-bottom: ${THEME.spacing.small};
	border: 1px solid ${COLORS.tableBorder};
	border-radius: 8px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	transition:
		box-shadow 0.3s ease,
		transform 0.3s ease;

	&:hover {
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		transform: translateY(-4px);
	}

	&:last-child {
		text-align: center;
	}

	@media (max-width: 768px) {
		padding: ${THEME.spacing.small};
		margin-bottom: ${THEME.spacing.verySmall};
	}

	@media (max-width: 480px) {
		padding: ${THEME.spacing.small};
		margin-bottom: ${THEME.spacing.verySmall};
	}
`;
