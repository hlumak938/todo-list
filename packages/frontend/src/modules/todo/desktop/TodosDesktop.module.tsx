import React from 'react';
import {
	addButtonRowStyle,
	paginationContainerStyle,
	tableDataStyle,
	tableHeaderStyle,
	tableRowStyle,
	tableStyle,
} from './TodosDesktop.styles';
import { Button, ButtonGroup, Icon } from '@blueprintjs/core';
import { TodoDeviceProps } from '~shared/services/types';
import ActionButtonsComponent from '~shared/components/ActionButtons/ActionButtons.component';
import { useTodoStore } from '~store/todo.store';

const TodosDesktop: React.FC<TodoDeviceProps> = ({ todos, onAddTodo }) => {
	const { loading, page, pageSize, total, setPage } = useTodoStore();

	const totalPages = Math.ceil(total / pageSize);

	const handlePageChange = (newPage: number): void => {
		if (!loading) {
			setPage(newPage);
		}
	};

	return (
		<>
			<table className={tableStyle}>
				<thead>
					<tr>
						<th className={tableHeaderStyle}>Title</th>
						<th className={tableHeaderStyle}>Description</th>
						<th className={tableHeaderStyle}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo) => (
						<tr key={todo.id} className={tableRowStyle}>
							<td className={tableDataStyle}>{todo.title}</td>
							<td className={tableDataStyle}>
								{todo.description}
							</td>
							<td className={tableDataStyle}>
								<ActionButtonsComponent
									todoId={todo.id}
									ownerId={todo.userId}
								/>
							</td>
						</tr>
					))}
					<tr className={addButtonRowStyle}>
						<td colSpan={3} onClick={onAddTodo}>
							<Icon icon="plus" size={30} />
						</td>
					</tr>
				</tbody>
			</table>
			<div className={paginationContainerStyle}>
				<ButtonGroup>
					{Array.from({ length: totalPages }, (_, index) => (
						<Button
							key={index + 1}
							text={`${index + 1}`}
							active={page === index + 1}
							onClick={() => handlePageChange(index + 1)}
							minimal={page === index + 1}
							intent={page === index + 1 ? 'primary' : 'none'}
						/>
					))}
				</ButtonGroup>
			</div>
		</>
	);
};

export default TodosDesktop;
