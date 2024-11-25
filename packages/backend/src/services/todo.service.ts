import {
	Prisma,
	PrismaClient,
	StatusOptions,
	Todo,
	VisibilityOptions,
} from '@prisma/client';

export default class TodoService {
	constructor(private prisma: PrismaClient) {}

	async findAll(
		userId: number | undefined,
		search?: string,
		status?: StatusOptions,
		visibility?: VisibilityOptions,
		page: number = 1,
		pageSize: number = 10,
	): Promise<{ todos: Todo[]; total: number }> {
		const filters: Prisma.TodoWhereInput = {};

		if (search) {
			filters.OR = [
				{ title: { contains: search, mode: 'insensitive' } },
				{ description: { contains: search, mode: 'insensitive' } },
			];
		}

		if (status) {
			filters.status = status;
		}

		if (visibility) {
			filters.visibility = visibility;
		}

		if (userId) {
			filters.OR = [
				{ userId: userId },
				{ visibility: VisibilityOptions.PUBLIC },
			];
		} else {
			filters.visibility = VisibilityOptions.PUBLIC;
		}

		const [todos, total] = await Promise.all([
			this.prisma.todo.findMany({
				where: filters,
				orderBy: { createdAt: 'desc' },
				skip: (page - 1) * pageSize,
				take: pageSize,
			}),
			this.prisma.todo.count({ where: filters }),
		]);

		return { todos, total };
	}

	async findById(
		todoId: number,
		userId: number | undefined,
	): Promise<Todo | null> {
		return this.prisma.todo.findFirst({
			where: {
				id: todoId,
				OR: [
					{ visibility: VisibilityOptions.PUBLIC },
					{ userId: userId ?? undefined },
				],
			},
		});
	}

	async create(data: Omit<Todo, 'id'>): Promise<Todo> {
		return this.prisma.todo.create({ data });
	}

	async update(todoId: number, data: Partial<Todo>): Promise<Todo> {
		return this.prisma.todo.update({
			where: { id: todoId },
			data,
		});
	}

	async delete(todoId: number): Promise<Todo> {
		return this.prisma.todo.delete({ where: { id: todoId } });
	}
}
