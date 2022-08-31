import { Router } from "express";
import { BidDTO } from "../../dtos";
import { authentication, authorization } from "../../middlewares";
import { getBids, saveNewBid } from "../../services";
import { validation } from "../../utilities";

export const bidRouter = Router();
bidRouter.use(authentication);
bidRouter.use(authorization("user"));

bidRouter.post("/bid", async (req, res, next) => {
	const bidDTO = new BidDTO();
	bidDTO.time = req.body.time;
	bidDTO.type = req.body.type;
	bidDTO.amount = req.body.amount;
	bidDTO.rate = req.body.rate;
	bidDTO.auctionId = req.body.auctionid;
	bidDTO.userName = res.locals.username;

	let validated;
	try {
		validated = await validation(bidDTO);
	} catch (error) {
		next(error);
	}

	if (validated) {
		try {
			const message = await saveNewBid(bidDTO);
			res.status(201).json({ success: message });
		} catch (error) {
			next(error);
		}
	}
});

bidRouter.get("/bids", async (req, res, next) => {
	try {
		const bids = await getBids(res.locals.username);
		res.json(bids);
	} catch (error) {
		next(error);
	}
});
