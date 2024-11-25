import Joi from 'joi';

export const todoSchema = Joi.object({
	title: Joi.string().min(3).max(35).trim().required().messages({
		'string.empty': 'Title is required',
		'string.min': 'Title must be at least 3 characters',
		'string.max': 'Title must be less than 35 characters',
	}),
	description: Joi.string().min(3).max(225).trim().required().messages({
		'string.empty': 'Description is required',
		'string.min': 'Description must be at least 3 characters',
		'string.max': 'Description must be less than 225 characters',
	}),
	isPrivate: Joi.boolean().required(),
	isComplete: Joi.boolean().required(),
});

export const registerSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			'string.base': '"Email" should be a type of text',
			'string.email': '"Email" must be a valid email address',
			'any.required': '"Email" is required',
		}),
	password: Joi.string().min(8).required().messages({
		'string.base': '"Password" should be a type of text',
		'string.min': '"Password" should have at least 8 characters',
		'any.required': '"Password" is required',
	}),
	confirmPassword: Joi.string()
		.valid(Joi.ref('password'))
		.required()
		.messages({
			'any.only': '"Confirm Password" must match the "Password"',
			'any.required': '"Confirm Password" is required',
		}),
});

export const loginSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			'string.base': '"Email" should be a type of text',
			'string.email': '"Email" must be a valid email address',
			'any.required': '"Email" is required',
		}),
	password: Joi.string().min(8).required().messages({
		'string.base': '"Password" should be a type of text',
		'string.min': '"Password" should have at least 8 characters',
		'any.required': '"Password" is required',
	}),
});

export const forgotPasswordSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			'string.base': '"Email" should be a type of text',
			'string.email': '"Email" must be a valid email address',
			'any.required': '"Email" is required',
		}),
});

export const resetPasswordSchema = Joi.object({
	newPassword: Joi.string().min(8).required().messages({
		'string.base': '"New Password" should be a type of text',
		'string.min': '"New Password" should have at least 8 characters',
		'any.required': '"New Password" is required',
	}),
	confirmPassword: Joi.string()
		.valid(Joi.ref('newPassword'))
		.required()
		.messages({
			'any.only': '"Confirm Password" must match the "New Password"',
			'any.required': '"Confirm Password" is required',
		}),
});

export const updateUserSchema = Joi.object({
	name: Joi.string().min(3).max(30).optional().messages({
		'string.base': '"Name" should be a type of text',
		'string.min': '"Name" should have at least 3 characters',
		'string.max': '"Name" should have no more than 30 characters',
	}),
	oldPassword: Joi.string().min(8).required().messages({
		'string.base': '"Old Password" should be a type of text',
		'string.min': '"Old Password" should have at least 8 characters',
		'any.required': '"Old Password" is required',
	}),
	newPassword: Joi.string().min(8).optional().messages({
		'string.base': '"New Password" should be a type of text',
		'string.min': '"New Password" should have at least 8 characters',
	}),
});
