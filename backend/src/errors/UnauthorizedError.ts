import { UNAUTHORIZED_ERROR } from "../configuration/httpErrorCodes";

export class UnauthorizedError extends Error {
	public errorCode = UNAUTHORIZED_ERROR;

	constructor(message: string) {
		super(message);
	}
}
