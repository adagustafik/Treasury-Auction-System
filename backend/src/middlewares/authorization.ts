import { NextFunction, Response, Request } from "express";
import { AppDataSource, User } from "../db";
import { ForbiddenError, UnauthorizedError } from "../errors";
import { UserType } from "./types";

export const authorization = (role: UserType) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const user = await AppDataSource.getRepository(User).findOneBy({
			userName: res.locals.username,
		});
		if (!user) {
			return next(new UnauthorizedError("Invalid username"));
		}

		if (role === "admin" && user.isAdmin === false) {
			return next(new ForbiddenError("Not authorized admin"));
		}
		if (role === "user" && user.isAdmin === true) {
			return next(new ForbiddenError("Not authorized user"));
		}
		return next();
	};
};
