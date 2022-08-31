import { Router } from "express";
import { UserDTO } from "../../dtos";
import { authentication } from "../../middlewares";
import { updateUser } from "../../services";
import { validation } from "../../utilities";

export const updateRouter = Router();
updateRouter.use(authentication);

updateRouter.put("/profile", async (req, res, next) => {
	try {
		const userDTO = new UserDTO();
		userDTO.userName = res.locals.username;
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
				const message = await updateUser(userDTO);
				res.json({ success: message });
			} catch (error) {
				next(error);
			}
		}
	} catch (error) {
		next(error);
	}
});
