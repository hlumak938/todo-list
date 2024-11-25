import { PrismaClient } from '@prisma/client';
import UserService from '@/services/user.service';
import { Request, Response } from 'express';
import {
	isJwtPayload,
	verifyEmailToken,
	verifyResetToken,
} from '@/middlewares/auth.middleware';
import EmailService from '@/services/email.service';

export class UserController {
	constructor(private userService: UserService) {}

	register = async (req: Request, res: Response): Promise<void> => {
		const { email, password, name } = req.body;
		const user = await this.userService.register(email, password, name);
		res.status(201).json({
			message: 'User registered successfully',
			user,
		});
	};

	login = async (req: Request, res: Response): Promise<void> => {
		const { email, password } = req.body;
		const { token, user } = await this.userService.login(email, password);
		res.json({ message: 'Login successful', token, user });
	};

	sendVerificationEmail = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const { id, email } = req.body;
		await this.userService.sendVerificationEmail(id, email);
		res.json({ message: `Verification email was sent to ${email}` });
	};

	verifyEmail = async (
		req: Request,
		res: Response,
	): Promise<Response | void> => {
		const { token } = req.query as { token: string };
		const decoded = verifyEmailToken(token);
		if (!decoded || !isJwtPayload(decoded)) {
			return res.status(400).json({ error: 'Invalid or expired token' });
		}

		await this.userService.verifyEmail(decoded.id);
		res.json({ message: 'Email verified successfully' });
	};

	forgotPassword = async (req: Request, res: Response): Promise<void> => {
		const { email } = req.body;
		await this.userService.forgotPassword(email);
		res.json({ message: 'Password reset link sent to your email' });
	};

	resetPassword = async (
		req: Request,
		res: Response,
	): Promise<Response | void> => {
		const { newPassword, token } = req.body;
		const decoded = verifyResetToken(token);
		if (!decoded || !isJwtPayload(decoded)) {
			return res.status(400).json({ error: 'Invalid or expired token' });
		}

		await this.userService.resetPassword(decoded.id, newPassword);
		res.json({ message: 'Password reset successfully' });
	};

	updateUser = async (
		req: Request,
		res: Response,
	): Promise<Response | void> => {
		const userId = req.user?.id;
		if (!userId) {
			return res.status(400).json({ error: 'Invalid user id' });
		}
		const { name, oldPassword, newPassword } = req.body;
		await this.userService.update(userId, name, oldPassword, newPassword);
		res.json({ name });
	};
}

const userController = new UserController(
	new UserService(new PrismaClient(), new EmailService()),
);
export default userController;
