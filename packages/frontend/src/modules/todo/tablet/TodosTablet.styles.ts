import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const sliderItemStyle = css`
	padding: ${THEME.spacing.medium};
	background-color: ${COLORS.background};
	border: 1px solid ${COLORS.tableBorder};
	border-radius: 12px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	text-align: center;
	transition:
		transform 0.3s ease,
		box-shadow 0.3s ease;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
	}

	h3 {
		font-size: 1.5rem;
		color: ${COLORS.primary};
		margin-bottom: ${THEME.spacing.small};
	}

	p {
		font-size: 1rem;
		color: ${COLORS.buttonText};
		margin-bottom: ${THEME.spacing.medium};
	}

	.action-buttons {
		display: flex;
		justify-content: center;
		gap: ${THEME.spacing.small};
	}

	&:last-child {
		margin-top: ${THEME.spacing.veryLarge};
	}
`;
