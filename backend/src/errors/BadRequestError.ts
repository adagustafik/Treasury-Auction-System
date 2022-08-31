import { BAD_REQUEST_ERROR } from "../configuration/httpErrorCodes";

export class BadRequestError extends Error {
	public errorCode = BAD_REQUEST_ERROR;

	constructor(message: string) {
		super(message);
	}
}
