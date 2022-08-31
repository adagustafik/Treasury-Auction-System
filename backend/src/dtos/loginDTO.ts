import { MinLength, IsDefined, Matches } from "class-validator";
import { PASSWORD_PATTERN } from "../configuration/patterns";

export class LoginDTO {
	@MinLength(3, {
		message: "$property should be at least $constraint1 characters long",
	})
	@IsDefined()
		userName!: string;

	@MinLength(8, {
		message: "$property should be at least $constraint1 characters long",
	})
	@Matches(PASSWORD_PATTERN)
	@IsDefined()
		password!: string;

	isAdmin!: boolean;
}
