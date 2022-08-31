import { NextFunction, Response, Request } from "express";
import { UnauthorizedError } from "../errors";
import { validateToken } from "../services";

export const authentication = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const cookies = req.headers.cookie;

	if (!cookies || !cookies.includes("token")) {
		throw new UnauthorizedError("Token is missing");
	}

	const tokenCookie = cookies.split("; ").filter((x) => x.includes("token"));
	const token = tokenCookie[0].replace("token=", "");

	res.locals.username = validateToken(token);
	return next();
};
