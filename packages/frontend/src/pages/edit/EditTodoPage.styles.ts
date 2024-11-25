import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const editTodoPageStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	padding: ${THEME.spacing.large};
	max-width: 700px;
	margin: 0 auto;
	color: ${COLORS.textPrimary};
`;

export const titleStyle = css`
	font-size: ${THEME.fontSizes.header};
	margin-bottom: ${THEME.spacing.medium};
	text-align: center;
	color: ${COLORS.textPrimary};
`;

export const formContainerStyle = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.spacing.medium};
	background-color: ${COLORS.backgroundDark};
	padding: ${THEME.spacing.large};
	border-radius: ${THEME.spacing.small};
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const buttonContainerStyle = css`
	display: flex;
	justify-content: center;
	gap: ${THEME.spacing.medium};
`;

export const cancelButtonStyle = css`
	background-color: ${COLORS.danger};
	color: ${COLORS.textPrimary};
	padding: 0.5rem 1.5rem;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${COLORS.dangerHover};
	}
`;

export const saveButtonStyle = css`
	background-color: ${COLORS.primaryDark};
	color: ${COLORS.textPrimary};
	padding: 0.5rem 1.5rem;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${COLORS.primaryHoverDark};
	}
`;
