import { FORBIDDEN_ERROR } from "../configuration/httpErrorCodes";

export class ForbiddenError extends Error {
	public errorCode = FORBIDDEN_ERROR;

	constructor(message: string) {
		super(message);
	}
}
