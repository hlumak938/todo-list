import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
	buttonGroupStyle,
	buttonStyle,
} from '~shared/components/ActionButtons/ActionButtons.styles';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';
import { Button, ButtonGroup } from '@blueprintjs/core';

interface TodoActionButtonsProps {
	todoId: number;
	ownerId: number;
}

const ActionButtonsComponent: React.FC<TodoActionButtonsProps> = ({
	todoId,
	ownerId,
}) => {
	const navigate = useNavigate();
	const id = todoId;
	const { deleteTodo } = useTodoStore();
	const { user } = useUserStore();

	const isOwner = user?.id === ownerId;

	const handleView = (): void => {
		navigate(`/todos/${id}`);
	};

	const handleEdit = (): void => {
		navigate(`/edit/${id}`);
	};

	const handleDelete = async (): Promise<void> => {
		try {
			await deleteTodo(id);
		} catch (error) {
			console.error('Failed to delete todo:', error);
		}
	};

	return (
		<ButtonGroup className={buttonGroupStyle}>
			<Button
				className={`${buttonStyle} view`}
				icon="eye-open"
				text="View"
				onClick={handleView}
			/>
			{isOwner && (
				<>
					<Button
						className={`${buttonStyle} edit`}
						icon="edit"
						text="Edit"
						intent="primary"
						onClick={handleEdit}
					/>
					<Button
						className={`${buttonStyle} delete`}
						icon="trash"
						text="Delete"
						intent="danger"
						onClick={handleDelete}
					/>
				</>
			)}
		</ButtonGroup>
	);
};

export default React.memo(ActionButtonsComponent);
