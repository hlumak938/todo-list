import HttpService from '~shared/services/http.service';
import { AxiosResponse } from 'axios';
import {
	CreateTodo,
	ITodo,
	StatusOptions,
	VisibilityOptions,
} from '~shared/services/types';

class TodoService extends HttpService {
	constructor() {
		super();
	}

	getTodos(filters?: {
		search: string;
		visibility: VisibilityOptions | '';
		status: StatusOptions | '';
		page?: string;
		pageSize?: string;
	}): Promise<
		AxiosResponse<{
			todos: ITodo[];
			total: number;
			page: number;
			pageSize: number;
		}>
	> {
		const params = new URLSearchParams(filters).toString();
		return this.get({ url: `todos?${params}` });
	}

	getTodoById(id: number): Promise<AxiosResponse<ITodo>> {
		return this.get({ url: `todos/${id}` });
	}

	createTodo(todo: CreateTodo): Promise<AxiosResponse<ITodo>> {
		return this.post({
			url: 'todos',
			data: todo,
		});
	}

	updateTodo(
		id: number,
		todo: Partial<ITodo>,
	): Promise<AxiosResponse<ITodo>> {
		return this.put({
			url: `todos/${id}`,
			data: todo,
		});
	}

	deleteTodo(id: number): Promise<AxiosResponse<void>> {
		return this.delete({
			url: `todos/${id}`,
		});
	}
}

export default new TodoService();
