import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const { errorCode, message } = err;

	console.log(err);

	if (!errorCode) {
		return next(err);
	}

	res.status(errorCode).send(message);
	return next();
};
