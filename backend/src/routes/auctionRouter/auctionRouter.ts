import { Router } from "express";
import { authentication } from "../../middlewares";
import { getAuctions, getPurchases } from "../../services";

export const auctionRouter = Router();
auctionRouter.use(authentication);

auctionRouter.get("/auctions", async (req, res, next) => {
	try {
		const auctions = await getAuctions();
		res.json(auctions);
	} catch (error) {
		next(error);
	}
});

auctionRouter.get("/purchases", async (req, res, next) => {
	try {
		const purchases = await getPurchases();
		res.json(purchases);
	} catch (error) {
		next(error);
	}
});
