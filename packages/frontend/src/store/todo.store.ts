import { create } from 'zustand';
import TodoService from '~shared/services/todo.service';
import {
	CreateTodo,
	Filters,
	ITodo,
	StatusOptions,
	VisibilityOptions,
} from '~shared/services/types';

interface ITodoStore {
	todos: ITodo[];
	total: number;
	page: number;
	pageSize: number;
	loading: boolean;
	error: string | null;
	filters: Filters;
	setPage: (newPage: number) => void;
	setPageSize: (newPageSize: number) => void;
	setFilters: (newFilters: Filters) => void;
	fetchTodos: (isInfiniteScroll: boolean) => Promise<void>;
	getTodoById: (id: number) => ITodo | undefined;
	addTodo: (todo: CreateTodo) => Promise<void>;
	updateTodo: (id: number, updates: Partial<ITodo>) => Promise<void>;
	deleteTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<ITodoStore>((set, get) => ({
	todos: [],
	total: 0,
	page: 1,
	pageSize: 7,
	loading: false,
	error: null,
	filters: {
		search: '',
		visibility: VisibilityOptions.ALL,
		status: StatusOptions.ALL,
	},

	setPage: (newPage): void => {
		set({ page: newPage });
	},

	setPageSize: (newPageSize): void => {
		set({ pageSize: newPageSize });
	},

	setFilters: (newFilters): void => {
		set({ filters: newFilters, todos: [], page: 1 });
	},

	fetchTodos: async (isInfiniteScroll: boolean): Promise<void> => {
		const { filters, page, pageSize } = get();
		const params = {
			search: filters.search.trim(),
			status: filters.status === StatusOptions.ALL ? '' : filters.status,
			visibility:
				filters.visibility === VisibilityOptions.ALL
					? ''
					: filters.visibility,
			page: '' + page,
			pageSize: '' + pageSize,
		};
		set({ loading: true, error: null });
		try {
			const response = await TodoService.getTodos(params);
			const newTodos = response.data.todos;

			set((state) => ({
				todos: isInfiniteScroll
					? [...state.todos, ...newTodos]
					: newTodos,
				total: response.data.total,
				page: response.data.page,
			}));
		} catch (error) {
			set({ error: (error as Error).message });
		} finally {
			set({ loading: false });
		}
	},

	getTodoById: (id: number): ITodo => {
		const { todos } = get();
		return todos.find((todo) => todo.id === id);
	},

	addTodo: async (todo): Promise<void> => {
		set({ loading: true, error: null });
		try {
			const response = await TodoService.createTodo(todo);
			set((state) => ({ todos: [response.data, ...state.todos] }));
		} catch (error) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},

	updateTodo: async (id, updates): Promise<void> => {
		set({ loading: true, error: null });
		try {
			const response = await TodoService.updateTodo(id, updates);
			set((state) => ({
				todos: state.todos.map((todo) =>
					todo.id === id ? { ...todo, ...response.data } : todo,
				),
			}));
		} catch (error) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},

	deleteTodo: async (id): Promise<void> => {
		set({ loading: true, error: null });
		try {
			await TodoService.deleteTodo(id);
			set((state) => ({
				todos: state.todos.filter((todo) => todo.id !== id),
			}));
		} catch (error) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},
}));
