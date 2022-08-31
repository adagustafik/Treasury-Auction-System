import { Router } from "express";
import { AuctionDTO } from "../../dtos";
import { authentication, authorization } from "../../middlewares";
import { resolveAuctions, saveNewAuction } from "../../services";
import { validation } from "../../utilities";

export const adminRouter = Router();
adminRouter.use(authentication);
adminRouter.use(authorization("admin"));

adminRouter.post("/createauction", async (req, res, next) => {
	const auctionDTO = new AuctionDTO();
	auctionDTO.securityOffered = req.body.securityOffered;
	auctionDTO.auctionDate = req.body.auctionDate;
	auctionDTO.issueDate = req.body.issueDate;
	auctionDTO.maturityDate = req.body.maturityDate;
	auctionDTO.termsAndConditions = req.body.termsAndConditions;
	auctionDTO.nonCompetitiveBidCloseTime = req.body.nonCompetitiveBidCloseTime;
	auctionDTO.competitiveBidCloseTime = req.body.competitiveBidCloseTime;
	auctionDTO.yield = req.body.yield;
	auctionDTO.rate = req.body.rate;
	auctionDTO.discount = req.body.discount;

	let validated;
	try {
		validated = await validation(auctionDTO);
	} catch (error) {
		next(error);
	}

	if (validated) {
		try {
			const message = await saveNewAuction(auctionDTO);
			res.status(201).json({ success: message });
		} catch (error) {
			next(error);
		}
	}
});

adminRouter.get("/resolve", async (req, res, next) => {
	try {
		const response = await resolveAuctions();
		res.json({ success: response });
	} catch (error) {
		next(error);
	}
});
