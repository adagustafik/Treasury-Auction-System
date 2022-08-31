import { INTERNAL_SERVER_ERROR } from "../configuration/httpErrorCodes";

export class InternalServerError extends Error {
	public errorCode = INTERNAL_SERVER_ERROR;

	constructor(message: string) {
		super(message);
	}
}
