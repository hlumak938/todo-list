import { COLORS, THEME } from '~shared/styles';
import { css } from '@emotion/css';

export const switchContainerStyle = css`
	display: flex;
	align-items: center;
	gap: ${THEME.spacing.small};
`;

export const switchStyle = css`
	.bp5-switch {
		color: ${COLORS.textPrimary};
		font-size: ${THEME.fontSizes.medium};
	}

	.bp5-switch.bp5-active {
		background-color: ${COLORS.switchActive};
	}

	.bp5-switch .bp5-switch-handle {
		background-color: ${COLORS.switchHandle};
	}

	.bp5-switch.bp5-active .bp5-switch-handle {
		background-color: ${COLORS.switchHandleActive};
	}
`;
