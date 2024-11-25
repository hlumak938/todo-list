import Joi from 'joi';

export const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
	name: Joi.string().min(3).max(30).optional(),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});

export const verifyEmailSchema = Joi.object({
	token: Joi.string().required().messages,
});

export const sendVerificationEmailSchema = Joi.object({
	id: Joi.number().required(),
	email: Joi.string().email().required(),
});

export const forgotPasswordSchema = Joi.object({
	email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
	newPassword: Joi.string().min(8).required(),
	confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
	token: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
	name: Joi.string().min(3).max(30).optional(),
	oldPassword: Joi.string().min(8).required(),
	newPassword: Joi.string().min(8).optional(),
});
