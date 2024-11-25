import { Request, Response, NextFunction } from 'express';

const isExist = <T>(
	model: { findUnique: (args: any) => Promise<T | null> },
	field: string = 'id',
) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const id = +req.params[field];
		if (!id) {
			res.status(400).json({
				message: `${field} is required or isn't valid`,
			});
			return;
		}

		const entity = await model.findUnique({
			where: { [field]: id },
		});

		if (!entity) {
			res.status(404).json({ message: `${field} ${id} have not found` });
			return;
		}
		next();
	};
};

export default isExist;
