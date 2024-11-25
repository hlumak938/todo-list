import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Switch } from '@blueprintjs/core';
import {
	backButtonStyle,
	buttonContainerStyle,
	descriptionStyle,
	detailsContainerStyle,
	switchStyle,
	titleStyle,
} from './TodoDetailsPage.styles';
import { useTodoStore } from '~store/todo.store';
import Loader from '~shared/components/loader/loader.component';
import { StatusOptions, VisibilityOptions } from '~shared/services/types';
import { useUserStore } from '~store/user.store';

export const TodoDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { getTodoById, updateTodo, fetchTodos } = useTodoStore();
	const { user } = useUserStore();
	const todo = getTodoById(+id);

	const isOwner = user?.id === todo.userId;

	useEffect(() => {
		if (!todo) {
			fetchTodos(false);
		}
	}, [todo]);

	const handleTogglePrivate = async (): Promise<void> => {
		if (todo) {
			await updateTodo(todo.id, {
				visibility:
					todo.visibility === VisibilityOptions.PRIVATE
						? VisibilityOptions.PUBLIC
						: VisibilityOptions.PRIVATE,
			});
		}
	};

	const handleToggleComplete = async (): Promise<void> => {
		if (todo) {
			await updateTodo(todo.id, {
				status:
					todo.status === StatusOptions.COMPLETED
						? StatusOptions.INCOMPLETE
						: StatusOptions.COMPLETED,
			});
		}
	};

	if (!todo) return <Loader />;

	return (
		<div className={detailsContainerStyle}>
			<h2 className={titleStyle}>{todo.title}</h2>
			<p className={descriptionStyle}>{todo.description}</p>

			{isOwner && (
				<>
					<Switch
						large
						className={switchStyle}
						checked={todo.visibility === VisibilityOptions.PRIVATE}
						label="Private"
						onChange={handleTogglePrivate}
					/>

					<Switch
						large
						className={switchStyle}
						checked={todo.status === StatusOptions.COMPLETED}
						label="Complete"
						onChange={handleToggleComplete}
					/>
				</>
			)}

			<div className={buttonContainerStyle}>
				<Button
					text="Back"
					intent="primary"
					onClick={() => navigate(-1)}
					className={backButtonStyle}
				/>
			</div>
		</div>
	);
};
