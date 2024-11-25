import { Request, Response } from 'express';
import TodoService from '@/services/todo.service';
import {
	PrismaClient,
	StatusOptions,
	Todo,
	VisibilityOptions,
} from '@prisma/client';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAll(req: Request, res: Response): Promise<void> {
		const userId = req.user?.id;
		const {
			search,
			status,
			visibility,
			page = 1,
			pageSize = 10,
		} = req.query;

		const { todos, total } = await this.todoService.findAll(
			userId,
			search as string,
			status as StatusOptions,
			visibility as VisibilityOptions,
			+page,
			+pageSize,
		);

		res.status(200).json({
			todos,
			total,
			page: +page,
			pageSize: +pageSize,
		});
	}

	async getOneById(
		req: Request,
		res: Response<Todo | { message: string }>,
	): Promise<void> {
		const todoId = +req.params.id;
		const userId = req.user?.id;
		const todo = await this.todoService.findById(todoId, userId);
		if (!todo) {
			res.status(404).json({ message: 'Todo not found' });
			return;
		}
		res.status(200).json(todo);
	}

	async create(req: Request, res: Response<Todo>): Promise<void> {
		const userId = req.user?.id;
		const newTodo = await this.todoService.create({ ...req.body, userId });
		res.status(201).json(newTodo);
	}

	async update(req: Request, res: Response<Todo>): Promise<void> {
		const todoId = +req.params.id;
		const updatedTodo = await this.todoService.update(todoId, req.body);
		res.status(200).json(updatedTodo);
	}

	async delete(req: Request, res: Response<string>): Promise<void> {
		const todoId = +req.params.id;
		const deletedTodo = await this.todoService.delete(todoId);
		res.status(200).send(`Todo deleted with ID: ${deletedTodo.id}`);
	}
}

const todoController = new TodoController(new TodoService(new PrismaClient()));
export default todoController;
