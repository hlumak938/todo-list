export const enum PUBLIC_ROUTER_KEYS {
	LOGIN = '/login',
	REGISTER = '/register',
	FORGOT_PASSWORD = '/forgot-password',
	RESET_PASSWORD = '/reset-password',
	VERIFY_EMAIL = '/verify-email',
}

export const enum PRIVATE_ROUTER_KEYS {
	TODOS = '/',
	TODO_DETAILS = '/todos/:id',
	EDIT = '/edit/:id',
	PROFILE = '/profile',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
});
