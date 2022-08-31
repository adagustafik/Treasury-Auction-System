import { validate } from "class-validator";
import { BadRequestError } from "../errors";

export const validation = async (entity: object): Promise<boolean> => {
	const errors = await validate(entity, { whitelist: true });

	if (errors.length > 0) {
		let messages: string[] = [];
		errors.forEach((err) => {
			if (err.constraints) {
				const constraintsObject: { [type: string]: string } =
					err.constraints;
				const msgs = Object.values(constraintsObject);
				messages = [...messages, ...msgs];
			}
		});
		throw new BadRequestError(JSON.stringify(messages));
	}

	return true;
};
