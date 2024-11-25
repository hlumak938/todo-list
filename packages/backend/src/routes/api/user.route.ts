import { Router } from 'express';
import { tryCatch, validate } from '@/middlewares';
import userController from '@/controllers/user.controller';
import {
	forgotPasswordSchema,
	loginSchema,
	registerSchema,
	resetPasswordSchema,
	sendVerificationEmailSchema,
	updateUserSchema,
	verifyEmailSchema,
} from '@/validators/user.validator';
import { authenticate } from '@/middlewares/auth.middleware';

const router: Router = Router();

router.post(
	'/register',
	validate(registerSchema),
	tryCatch(userController.register.bind(userController)),
);
router.post(
	'/login',
	validate(loginSchema),
	tryCatch(userController.login.bind(userController)),
);
router.get(
	'/verify-email',
	validate(verifyEmailSchema),
	tryCatch(userController.verifyEmail.bind(userController)),
);
router.post(
	'/verify-email',
	validate(sendVerificationEmailSchema),
	tryCatch(userController.sendVerificationEmail.bind(userController)),
);
router.post(
	'/forgot-password',
	validate(forgotPasswordSchema),
	tryCatch(userController.forgotPassword.bind(userController)),
);
router.post(
	'/reset-password',
	validate(resetPasswordSchema),
	tryCatch(userController.resetPassword.bind(userController)),
);
router.put(
	'/profile',
	authenticate,
	validate(updateUserSchema),
	tryCatch(userController.updateUser.bind(userController)),
);

export default router;
