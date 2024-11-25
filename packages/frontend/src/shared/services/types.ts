export enum VisibilityOptions {
	ALL = 'ALL',
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
}

export enum StatusOptions {
	ALL = 'ALL',
	COMPLETED = 'COMPLETED',
	INCOMPLETE = 'INCOMPLETE',
}

export interface ITodo {
	id: number;
	title: string;
	description: string;
	status: StatusOptions;
	visibility: VisibilityOptions;
	createdAt: string;
	updatedAt: string;
	userId: number;
}

export type CreateTodo = Omit<
	ITodo,
	'id' | 'createdAt' | 'updatedAt' | 'userId'
>;

export type BaseFormValues = {
	title: string;
	description: string;
	isComplete: boolean;
	isPrivate: boolean;
};

export type TodoFormValues = BaseFormValues & {
	status?: StatusOptions;
	visibility?: VisibilityOptions;
};

export interface TodoDeviceProps {
	todos?: ITodo[];
	onAddTodo: () => void;
}

export interface IUser {
	id: number;
	name?: string | null;
	email: string;
	isVerified: boolean;
}

export type AuthUser = Pick<IUser, 'email'> & {
	confirmPassword?: string;
};

export interface UpdateUserPayload {
	name?: string;
	oldPassword: string;
	newPassword?: string;
}

export interface Filters {
	search: string;
	visibility: VisibilityOptions | '';
	status: StatusOptions | '';
}
