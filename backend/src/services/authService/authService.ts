import { AppDataSource, User } from "../../db";
import { UserDTO, LoginDTO } from "../../dtos";
import { UnprocessableEntityError, UnauthorizedError } from "../../errors";
import { secretKey } from "../../configuration";
import jwt from "jsonwebtoken";

export const registerNewUser = async (userDTO: UserDTO): Promise<string> => {
	const user = new User();
	user.userName = userDTO.userName;
	user.email = userDTO.email;
	user.password = userDTO.password;

	const userCheck = await AppDataSource.getRepository(User).findOneBy({
		userName: user.userName,
	});

	if (userCheck) {
		throw new UnprocessableEntityError("Username already exists");
	}

	const newUser = await AppDataSource.getRepository(User).save(user);
	return (
		"Dear " + newUser.userName + ", you have been successfully registered!"
	);
};

export const generateToken = (username: string): string => {
	const oneDayFromNow = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
	return jwt.sign({ username: username }, `${secretKey}` || "", {
		expiresIn: oneDayFromNow,
	});
};

export const validateToken = (token: string): string => {
	let payload;

	try {
		payload = jwt.verify(token, `${secretKey}` || "");
	} catch (error) {
		const { name, message } = error as Error;
		throw new UnauthorizedError(name + ": " + message);
	}

	if (typeof payload !== "string" && payload !== undefined) {
		return payload.username;
	} else {
		throw new UnauthorizedError("Bad token");
	}
};

export const loginUser = async (
	loginDTO: LoginDTO,
): Promise<{ userName: string; isAdmin: boolean; email: string }> => {
	const user = await AppDataSource.getRepository(User).findOneBy({
		userName: loginDTO.userName,
		password: loginDTO.password,
	});

	if (!user) {
		throw new UnauthorizedError("Username or Password are not valid!");
	}

	return {
		userName: user.userName,
		isAdmin: user.isAdmin,
		email: user.email,
	};
};

export const updateUser = async (userDTO: UserDTO): Promise<string> => {
	const user = await AppDataSource.getRepository(User).findOneBy({
		userName: userDTO.userName,
	});

	if (!user) {
		throw new UnauthorizedError("Username is not valid!");
	}

	user.email = userDTO.email;
	user.password = userDTO.password;

	await AppDataSource.getRepository(User).save(user);
	return "Profile of " + user.userName + " has been updated";
};
