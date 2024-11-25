import Joi from 'joi';
import { StatusOptions, VisibilityOptions } from '@prisma/client';

export const createTodoSchema = Joi.object({
	title: Joi.string().min(3).max(35).trim().required(),
	description: Joi.string().min(3).max(225).trim().required(),
	status: Joi.string().default(StatusOptions.INCOMPLETE),
	visibility: Joi.string().default(VisibilityOptions.PUBLIC),
});

export const updateTodoSchema = createTodoSchema.fork(
	['title', 'description', 'visibility', 'status'],
	(schema) => schema.optional(),
);
