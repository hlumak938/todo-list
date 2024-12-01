import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import TodoForm from '~shared/components/TodoForm/TodoForm.component';
import { editTodoPageStyles, titleStyle } from './EditTodoPage.styles';
import Loader from '~shared/components/loader/loader.component';
import {
	StatusOptions,
	TodoFormValues,
	VisibilityOptions,
} from '~shared/services/types';

const EditTodoPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { getTodoById, updateTodo, currentTodo: todo } = useTodoStore();

	useEffect(() => {
		getTodoById(+id);
	}, []);

	const handleFormSubmit = async (data: TodoFormValues): Promise<void> => {
		const { isPrivate, isComplete, ...todoData } = data;
		if (todo) {
			await updateTodo(todo.id, {
				...todoData,
				status: isComplete
					? StatusOptions.COMPLETED
					: StatusOptions.INCOMPLETE,
				visibility: isPrivate
					? VisibilityOptions.PRIVATE
					: VisibilityOptions.PUBLIC,
			});
		}
	};

	if (!todo) return <Loader />;

	return (
		<div className={editTodoPageStyles}>
			<h2 className={titleStyle}>Edit Todo</h2>
			<TodoForm
				initialValues={{
					title: todo.title,
					description: todo.description,
					isPrivate: todo.visibility === VisibilityOptions.PRIVATE,
					isComplete: todo.status === StatusOptions.COMPLETED,
				}}
				buttonText="Save Changes"
				onSubmit={handleFormSubmit}
				onCancel={() => navigate(-1)}
			/>
		</div>
	);
};

export default EditTodoPage;
