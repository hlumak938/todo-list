export const SALT_ROUNDS = 10;

export const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
export const EMAIL_SECRET_KEY = process.env.EMAIL_SECRET || 'email_secret_key';
export const RESET_PASSWORD_SECRET_KEY =
	process.env.RESET_PASSWORD_SECRET || 'reset_password_secret_key';
