import React from 'react';
import Slider from 'react-slick';
import { Icon } from '@blueprintjs/core';
import { sliderItemStyle } from './TodosTablet.styles';
import ActionButtonsComponent from '~shared/components/ActionButtons/ActionButtons.component';
import { TodoDeviceProps } from '~shared/services/types';
import { SLIDER_SETTINGS } from '~utils/constants';
import { useTodoStore } from '~store/todo.store';

const TodosTablet: React.FC<TodoDeviceProps> = ({ todos, onAddTodo }) => {
	const { setPage, page, total, loading } = useTodoStore();

	const handleAfterChange = async (index: number): Promise<void> => {
		if (index >= todos.length - 1 && todos.length < total && !loading) {
			setPage(page + 1);
		}
	};

	return (
		<>
			<Slider
				{...SLIDER_SETTINGS(todos.length)}
				afterChange={handleAfterChange}
			>
				{todos.map((todo) => (
					<div key={todo.id} className={sliderItemStyle}>
						<h3>{todo.title}</h3>
						<p>{todo.description}</p>
						<ActionButtonsComponent
							todoId={todo.id}
							ownerId={todo.userId}
						/>
					</div>
				))}
			</Slider>
			<div className={sliderItemStyle} onClick={onAddTodo}>
				<Icon icon="plus" />
			</div>
		</>
	);
};

export default TodosTablet;
