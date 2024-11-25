import React, { useEffect } from 'react';
import { Icon } from '@blueprintjs/core';
import { listItemStyle } from './TodosMobile.styles';
import ActionButtonsComponent from '~shared/components/ActionButtons/ActionButtons.component';
import { TodoDeviceProps } from '~shared/services/types';
import { useTodoStore } from '~store/todo.store';
import Loader from '~shared/components/loader/loader.component';
import { useInView } from 'react-intersection-observer';

const TodosMobile: React.FC<TodoDeviceProps> = ({ todos, onAddTodo }) => {
	const { loading, total, setPage, page } = useTodoStore();
	const { ref, inView } = useInView({
		threshold: 0.4,
	});

	useEffect(() => {
		if (inView && todos.length < total && !loading) {
			setPage(page + 1);
		}
	}, [inView]);

	return (
		<div>
			{todos.map((todo) => (
				<div key={todo.id} className={listItemStyle}>
					<h3>{todo.title}</h3>
					<p>{todo.description}</p>
					<ActionButtonsComponent
						todoId={todo.id}
						ownerId={todo.userId}
					/>
				</div>
			))}
			{loading && <Loader />}
			{
				<div ref={ref} className={listItemStyle} onClick={onAddTodo}>
					<Icon icon="plus" />
				</div>
			}
		</div>
	);
};

export default TodosMobile;
