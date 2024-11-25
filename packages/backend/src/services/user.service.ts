import { PrismaClient } from '@prisma/client';
import {
	generateEmailToken,
	generateResetToken,
	generateToken,
} from '@/middlewares/auth.middleware';
import bcrypt from 'bcrypt';
import EmailService from '@/services/email.service';
import { SALT_ROUNDS } from '@/config/constants';
import { IUser } from '@/types/user.type';

export default class UserService {
	constructor(
		private prisma: PrismaClient,
		private emailService: EmailService,
	) {}

	async register(
		email: string,
		password: string,
		name: string,
	): Promise<IUser> {
		const existingUser = await this.prisma.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			throw new Error('Email already in use');
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const user = await this.prisma.user.create({
			data: { email, password: hashedPassword, name },
		});

		await this.sendVerificationEmail(user.id, email);

		const { password: _, ...userWithoutPassword } = user;

		return userWithoutPassword;
	}

	async login(
		email: string,
		password: string,
	): Promise<{ token: string; user: IUser }> {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new Error('Invalid email or password');
		}

		const { password: _, ...userWithoutPassword } = user;

		const token = generateToken({ id: user.id, email: user.email });
		return { token, user: userWithoutPassword };
	}

	async verifyEmail(userId: number): Promise<void> {
		await this.prisma.user.update({
			where: { id: userId },
			data: { isVerified: true },
		});
	}

	async sendVerificationEmail(userId: number, email: string): Promise<void> {
		const verificationToken = generateEmailToken(userId);
		const verificationLink = `${process.env.HOST}:${process.env.FRONT_PORT}/verify-email?token=${verificationToken}`;
		await this.emailService.sendEmail(
			email,
			'Verify Your Email',
			`Click this link to verify your email: ${verificationLink}`,
		);
	}

	async forgotPassword(email: string): Promise<void> {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) {
			throw new Error('User not found');
		}

		const resetToken = generateResetToken(user.id);
		const resetLink = `${process.env.HOST}:${process.env.FRONT_PORT}/reset-password?token=${resetToken}`;
		await this.emailService.sendEmail(
			email,
			'Reset Your Password',
			`Click this link to reset your password: ${resetLink}`,
		);
	}

	async resetPassword(userId: number, newPassword: string): Promise<void> {
		const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
		await this.prisma.user.update({
			where: { id: userId },
			data: { password: hashedPassword },
		});
	}

	async update(
		userId: number,
		name?: string,
		oldPassword?: string,
		newPassword?: string,
	): Promise<{ name: string | null }> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});
		if (!user) {
			throw new Error('User not found');
		}

		if (!oldPassword) {
			throw new Error('Old password is required to update profile');
		}

		const updateData: { name?: string; password?: string } = {};
		if (name) {
			updateData.name = name;
		}

		if (oldPassword && newPassword) {
			const isMatch = await bcrypt.compare(oldPassword, user.password);
			if (!isMatch) {
				throw new Error('Old password is incorrect');
			}

			updateData.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
		}

		const updatedUser = await this.prisma.user.update({
			where: { id: userId },
			data: updateData,
		});

		return { name: updatedUser.name };
	}
}
