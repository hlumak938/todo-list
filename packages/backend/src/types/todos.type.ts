import { StatusOptions, VisibilityOptions } from '@prisma/client';

export interface ITodo {
	title: string;
	description: string;
	status: StatusOptions;
	visibility: VisibilityOptions;
}
