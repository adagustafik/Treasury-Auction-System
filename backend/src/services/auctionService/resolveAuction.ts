import { EntityManager } from "typeorm";
import { AppDataSource, Auction, Bid, Purchase } from "../../db";

const calculateFinalRate = (rate: number, bids: Bid[]): number => {
	if (bids.length > 0) {
		rate = bids.map((bid) => bid.rate).reduce((a, b) => (a > b ? a : b));
	}
	return rate;
};

const awardBids = async (
	transactionalEntityManager: EntityManager,
	auction: Auction,
	rate: number,
	securityOffered: number,
	bids: Bid[],
): Promise<number> => {
	for (let j = 0; j < bids.length; j += 1) {
		if (securityOffered > 0) {
			const purchase = new Purchase();
			purchase.amount =
				securityOffered > bids[j].amount
					? bids[j].amount
					: securityOffered;
			purchase.rate = rate;
			purchase.auction = auction;
			purchase.bid = bids[j];
			transactionalEntityManager.save(purchase);
			securityOffered -= purchase.amount;
		}
	}
	return securityOffered;
};

export const resolveAuction = async (auction: Auction) => {
	const bidsComp = await AppDataSource.getRepository(Bid).find({
		relations: {
			user: true,
		},
		where: {
			auction: auction,
			type: "comp",
		},
		order: {
			rate: "DESC",
		},
	});
	const bidsNoncomp = await AppDataSource.getRepository(Bid).find({
		relations: {
			user: true,
		},
		where: {
			auction: auction,
			type: "noncomp",
		},
		order: {
			time: "ASC",
		},
	});
	const finalRate = calculateFinalRate(auction.rate, bidsComp);
	await AppDataSource.transaction(async (transactionalEntityManager) => {
		const securityOfferedLeftover = await awardBids(
			transactionalEntityManager,
			auction,
			finalRate,
			auction.securityOffered,
			bidsNoncomp,
		);
		await awardBids(
			transactionalEntityManager,
			auction,
			finalRate,
			securityOfferedLeftover,
			bidsComp,
		);

		auction.resolved = true;
		await transactionalEntityManager.save(auction);
	});
	return;
};
