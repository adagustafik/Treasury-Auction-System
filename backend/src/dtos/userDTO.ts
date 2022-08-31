import { MinLength, IsEmail, IsDefined, Matches } from "class-validator";
import { PASSWORD_PATTERN } from "../configuration";

export class UserDTO {
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

	@MinLength(6, {
		message: "$property should be at least $constraint1 characters long",
	})
	@IsEmail({ message: "$property should be a valid email address" })
	@IsDefined()
		email!: string;
}
