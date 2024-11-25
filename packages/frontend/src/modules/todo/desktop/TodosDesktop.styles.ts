import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles';

export const tableStyle = css`
	width: 100%;
	border-collapse: collapse;
	background-color: ${COLORS.background};
`;

export const tableHeaderStyle = css`
	padding: ${THEME.spacing.medium};
	background-color: ${COLORS.tableHeader};
	color: ${COLORS.tableData};
	border-bottom: 1px solid ${COLORS.tableBorder};
	text-align: left;

	&:last-child {
		text-align: center;
	}
`;

export const tableRowStyle = css`
	border-bottom: 1px solid ${COLORS.tableBorder};
	&:hover {
		background-color: ${COLORS.hoverAddButton};
	}
`;

export const tableDataStyle = css`
	padding: ${THEME.spacing.medium};
	color: ${COLORS.tableData};
	text-align: left;
`;

export const addButtonRowStyle = css`
	text-align: center;
	padding: ${THEME.spacing.large};
	background-color: ${COLORS.buttonBackground};
	transition: background-color 0.7s ease;
	cursor: pointer;

	span {
		margin: ${THEME.spacing.medium};
		color: ${COLORS.tableData};
	}

	&:hover {
		background-color: ${COLORS.hoverAddButton};
	}
`;

export const paginationContainerStyle = css`
	display: flex;
	justify-content: center;
	margin-top: ${THEME.spacing.large};

	.bp5-button {
		background-color: ${COLORS.buttonBackground};
		color: ${COLORS.buttonText};
		transition: background-color 0.3s ease;

		&.bp5-active {
			background-color: ${COLORS.paginationActive};
			color: ${COLORS.buttonText};
		}

		&:hover {
			background-color: ${COLORS.paginationHover};
		}
	}
`;
