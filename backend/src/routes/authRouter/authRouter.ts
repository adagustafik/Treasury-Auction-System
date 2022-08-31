import { Router } from "express";
import { LoginDTO } from "../../dtos";
import {
	generateToken,
	loginUser,
	registerNewUser,
} from "../../services/authService/authService";
import { validation } from "../../utilities/validation";
import { UserDTO } from "../../dtos";

export const authRouter = Router();

authRouter.post("/logout", async (req, res, next) => {
	try {
		res.clearCookie("token");
		res.json({
			success: "You were successfully logged out.",
		});
	} catch (error) {
		next(error);
	}
});

authRouter.post("/login", async (req, res, next) => {
	const loginDTO = new LoginDTO();
	loginDTO.userName = req.body.username;
	loginDTO.password = req.body.password;

	let validated;

	try {
		validated = await validation(loginDTO);
	} catch (error) {
		next(error);
	}

	if (validated) {
		try {
			const { userName, isAdmin, email } = await loginUser(loginDTO);
			const token = generateToken(userName);
			res.cookie("token", token);
			res.json({
				username: userName,
				admin: isAdmin,
				email: email,
			});
		} catch (error) {
			next(error);
		}
	}
});

authRouter.post("/register", async (req, res, next) => {
	const userDTO = new UserDTO();
	userDTO.userName = req.body.username;
	userDTO.email = req.body.email;
	userDTO.password = req.body.password;

	let validated;

	try {
		validated = await validation(userDTO);
	} catch (error) {
		next(error);
	}

	if (validated) {
		try {
			const message = await registerNewUser(userDTO);
			res.status(201).json({ success: message });
		} catch (error) {
			next(error);
		}
	}
});
