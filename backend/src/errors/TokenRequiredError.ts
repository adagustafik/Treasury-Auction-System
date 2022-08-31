import { TOKEN_REQUIRED_ERROR } from "../configuration/httpErrorCodes";

export class TokenRequiredError extends Error {
	public errorCode = TOKEN_REQUIRED_ERROR;

	constructor(message: string) {
		super(message);
	}
}
