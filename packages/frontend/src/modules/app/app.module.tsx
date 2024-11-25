import * as React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { useTodoStore } from '~store/todo.store';
import { pageContainerStyle } from '~modules/app/app.styles';
import { useMediaQuery } from '~hooks/useMediaQuery';
import Header from '~shared/components/header/header.component';
import AddTodoModal from '~shared/components/modal/AddTodoModal.component';
import { CreateTodo } from '~shared/services/types';
import TodosMobile from '~modules/todo/mobile/TodosMobile.module';
import Loader from '~shared/components/loader/loader.component';
import TodosTablet from '~modules/todo/tablet/TodosTablet.module';
import TodosDesktop from '~modules/todo/desktop/TodosDesktop.module';

const App = (): React.ReactNode => {
	const { fetchTodos, todos, page, addTodo, filters } = useTodoStore();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const isTablet = useMediaQuery(768);
	const isMobile = useMediaQuery(430);

	useEffect(() => {
		if (isTablet || isMobile) {
			fetchTodos(true);
		} else {
			fetchTodos(false);
		}
	}, [filters, page]);

	const handleOpenModal = (): void => {
		setIsModalOpen(true);
	};

	const handleCloseModal = (): void => {
		setIsModalOpen(false);
	};

	const handleAddTodo = async (data: CreateTodo): Promise<void> => {
		await addTodo(data);
	};

	const renderTodos = (): React.ReactElement => {
		return (
			<Suspense fallback={<Loader />}>
				{isMobile ? (
					<TodosMobile todos={todos} onAddTodo={handleOpenModal} />
				) : isTablet ? (
					<TodosTablet todos={todos} onAddTodo={handleOpenModal} />
				) : (
					<TodosDesktop todos={todos} onAddTodo={handleOpenModal} />
				)}
			</Suspense>
		);
	};

	return (
		<div className={pageContainerStyle}>
			<Header />
			{renderTodos()}
			<AddTodoModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onSubmit={handleAddTodo}
			/>
		</div>
	);
};

export default App;
