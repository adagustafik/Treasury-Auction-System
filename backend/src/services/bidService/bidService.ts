import { AppDataSource, Auction, Bid, User } from "../../db";
import { BidDTO } from "../../dtos";
import { BadRequestError, ForbiddenError } from "../../errors";

const checkBidConstraints = async (bid: Bid): Promise<boolean> => {
	const today = new Date();
	const todayNum = today.getTime();
	if (bid.auction.auctionDate.getTime() > todayNum) {
		throw new ForbiddenError("Auction has not started yet");
	}

	const nonCompCloseTimeNum =
		bid.auction.nonCompetitiveBidCloseTime.getTime();
	const compCloseTimeNum = bid.auction.competitiveBidCloseTime.getTime();
	const ended =
		nonCompCloseTimeNum > compCloseTimeNum
			? nonCompCloseTimeNum
			: compCloseTimeNum;
	if (ended < todayNum) {
		throw new ForbiddenError("Auction has already ended");
	}

	const bidsByUserForThisAuction = await AppDataSource.getRepository(
		Bid,
	).find({
		relations: {
			user: true,
			auction: true,
		},
		where: {
			user: bid.user,
			auction: bid.auction,
		},
	});

	if (bid.type == "comp") {
		if (bid.rate < bid.auction.rate) {
			throw new ForbiddenError("Rate is lower than Action rate");
		}
		let totalAmount = bid.amount;
		const previousBids = bidsByUserForThisAuction.filter(
			(bid) => bid.type == "comp",
		);
		if (previousBids.length > 0) {
			const currentAmount = previousBids
				.map((bid) => bid.amount)
				.reduce((a, b) => a + b);
			totalAmount += currentAmount;
		}
		if (totalAmount > 0.35 * bid.auction.securityOffered) {
			throw new ForbiddenError(
				"Maximum limit for competitive bids exceeded",
			);
		}
	}

	if (bid.type == "noncomp") {
		let totalAmount = bid.amount * bid.auction.rate;
		const previousBids = bidsByUserForThisAuction.filter(
			(bid) => bid.type == "noncomp",
		);
		if (previousBids.length > 0) {
			const currentAmount = previousBids
				.map((bid) => bid.amount * bid.auction.rate)
				.reduce((a, b) => a + b);
			totalAmount += currentAmount;
		}
		if (totalAmount > 5000000) {
			throw new ForbiddenError(
				"Maximum limit for noncompetitive bids exceeded",
			);
		}
	}
	return true;
};

export const saveNewBid = async (bidDTO: BidDTO): Promise<string> => {
	const bid = new Bid();
	bid.time = new Date(Date.parse(bidDTO.time));
	bid.type = bidDTO.type;
	bid.amount = bidDTO.amount;
	if (bid.type == "comp") {
		bid.rate = bidDTO.rate;
	}

	const user = await AppDataSource.getRepository(User).findOneBy({
		userName: bidDTO.userName,
	});

	if (user) {
		bid.user = user;
	} else {
		throw new BadRequestError("Invalid username");
	}

	const auction = await AppDataSource.getRepository(Auction).findOneBy({
		auctionId: bidDTO.auctionId,
	});

	if (auction) {
		bid.auction = auction;
	} else {
		throw new BadRequestError("Invalid auction");
	}

	const bidConstraints = await checkBidConstraints(bid);

	if (bidConstraints) {
		const newBid = await AppDataSource.getRepository(Bid).save(bid);
		return (
			"Bid taken for auction id: " +
			newBid.auction.auctionId +
			" user: " +
			newBid.user.userName
		);
	}
	return "Bid was not saved";
};

export const getBids = async (userName: string): Promise<Bid[]> => {
	const userDB = await AppDataSource.getRepository(User).findOneBy({
		userName: userName,
	});

	if (!userDB) {
		throw new BadRequestError("Invalid username");
	}

	return await AppDataSource.getRepository(Bid).find({
		relations: {
			auction: true,
		},
		where: {
			user: userDB,
		},
		order: {
			time: "DESC",
		},
	});
};
