import jwt, { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import {
	EMAIL_SECRET_KEY,
	RESET_PASSWORD_SECRET_KEY,
	SECRET_KEY,
} from '@/config/constants';
import prisma from '../utils/prisma.client';

export const authenticateJwt = passport.authenticate('jwt', { session: false });

export const generateToken = (user: { id: number; email: string }): string => {
	return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
		expiresIn: '2h',
	});
};

export const generateEmailToken = (userId: number): string => {
	return jwt.sign({ id: userId }, EMAIL_SECRET_KEY, { expiresIn: '1d' });
};

export const isJwtPayload = (
	decoded: string | JwtPayload,
): decoded is JwtPayload => {
	return (decoded as JwtPayload).id !== undefined;
};

export const verifyEmailToken = (token: string): string | JwtPayload | null => {
	try {
		return jwt.verify(token, EMAIL_SECRET_KEY);
	} catch {
		return null;
	}
};

export const generateResetToken = (userId: number): string => {
	return jwt.sign({ id: userId }, RESET_PASSWORD_SECRET_KEY, {
		expiresIn: '2h',
	});
};

export const verifyResetToken = (token: string): string | JwtPayload | null => {
	try {
		return jwt.verify(token, RESET_PASSWORD_SECRET_KEY);
	} catch {
		return null;
	}
};

export const checkTodoOwnership = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response | void> => {
	const todoId = +req.params.id;
	const userId = req.user?.id;

	try {
		const todo = await prisma.todo.findUnique({ where: { id: todoId } });
		if (!todo) {
			return res.status(404).json({ message: 'Todo not found' });
		}

		if (todo.userId !== userId) {
			return res.status(403).json({
				message: 'You do not have permission to perform this action',
			});
		}

		next();
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response | void> => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
		const user = await prisma.user.findUnique({
			where: { id: decoded.id },
		});

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		req.user = {
			id: user.id,
			email: user.email,
			name: user.name,
			password: user.password,
			isVerified: user.isVerified,
		};

		next();
	} catch (error) {
		return res.status(401).json({ error: 'Invalid token' });
	}
};
