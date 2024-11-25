import { NextFunction, Request, Response } from 'express';

const tryCatch = <T>(
	callback: (
		req: Request<T>,
		res: Response,
		next: NextFunction,
	) => Promise<Response | void>,
): ((req: Request<T>, res: Response, next: NextFunction) => Promise<void>) => {
	return async (req, res, next) => {
		try {
			await callback(req, res, next);
		} catch (error) {
			res.status(400).send({
				errors: { message: `${error}` },
			});
		}
	};
};

export default tryCatch;
