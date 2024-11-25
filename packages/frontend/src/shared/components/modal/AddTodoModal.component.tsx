import React from 'react';
import { Dialog } from '@blueprintjs/core';
import TodoForm from '~shared/components/TodoForm/TodoForm.component';
import {
	CreateTodo,
	StatusOptions,
	TodoFormValues,
	VisibilityOptions,
} from '~shared/services/types';
import { modalContainerStyle } from '~shared/components/modal/AddTodoModal.styles';

interface AddTodoModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: TodoFormValues | CreateTodo) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const handleFormSubmit = (data: TodoFormValues): void => {
		const { isPrivate, isComplete, ...rest } = data;
		onSubmit({
			...rest,
			status: isComplete
				? StatusOptions.COMPLETED
				: StatusOptions.INCOMPLETE,
			visibility: isPrivate
				? VisibilityOptions.PRIVATE
				: VisibilityOptions.PUBLIC,
		});
		onClose();
	};

	return (
		<Dialog
			isOpen={isOpen}
			className={modalContainerStyle}
			onClose={onClose}
			title="Add New Todo"
		>
			<TodoForm
				onSubmit={handleFormSubmit}
				onCancel={onClose}
				buttonText="Add Todo"
				hideCompleteSwitch
			/>
		</Dialog>
	);
};

export default AddTodoModal;
