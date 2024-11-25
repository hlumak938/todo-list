import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { isExist, tryCatch, validate } from '@/middlewares';
import { PrismaClient } from '@prisma/client';
import {
	createTodoSchema,
	updateTodoSchema,
} from '@/validators/todo.validator';
import {
	authenticateJwt,
	checkTodoOwnership,
} from '@/middlewares/auth.middleware';

const todosRouter: Router = Router();

const prisma = new PrismaClient();

todosRouter.get(
	'/',
	authenticateJwt,
	tryCatch(todoController.getAll.bind(todoController)),
);
todosRouter.get(
	'/:id',
	isExist(prisma.todo),
	authenticateJwt,
	tryCatch(todoController.getOneById.bind(todoController)),
);
todosRouter.post(
	'/',
	validate(createTodoSchema),
	authenticateJwt,
	tryCatch(todoController.create.bind(todoController)),
);
todosRouter.put(
	'/:id',
	isExist(prisma.todo),
	validate(updateTodoSchema),
	authenticateJwt,
	checkTodoOwnership,
	tryCatch(todoController.update.bind(todoController)),
);
todosRouter.delete(
	'/:id',
	isExist(prisma.todo),
	authenticateJwt,
	checkTodoOwnership,
	tryCatch(todoController.delete.bind(todoController)),
);

export default todosRouter;
