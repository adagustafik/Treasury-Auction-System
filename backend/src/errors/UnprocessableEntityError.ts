import { UNPROCESSABLE_ENTITY_ERROR } from "../configuration/httpErrorCodes";

export class UnprocessableEntityError extends Error {
	public errorCode = UNPROCESSABLE_ENTITY_ERROR;

	constructor(message: string) {
		super(message);
	}
}
