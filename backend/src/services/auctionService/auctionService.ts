import { LessThan } from "typeorm";
import { AppDataSource, Auction, Purchase } from "../../db";
import { resolveAuction } from "./resolveAuction";
import { AuctionDTO } from "../../dtos";

export const saveNewAuction = async (
	auctionDTO: AuctionDTO,
): Promise<string> => {
	const auction = new Auction();
	auction.auctionDate = new Date(Date.parse(auctionDTO.auctionDate));
	auction.securityOffered = auctionDTO.securityOffered;
	auction.issueDate = new Date(Date.parse(auctionDTO.issueDate));
	auction.maturityDate = new Date(Date.parse(auctionDTO.maturityDate));
	auction.termsAndConditions = auctionDTO.termsAndConditions;
	auction.nonCompetitiveBidCloseTime = new Date(
		Date.parse(auctionDTO.nonCompetitiveBidCloseTime),
	);
	auction.competitiveBidCloseTime = new Date(
		Date.parse(auctionDTO.competitiveBidCloseTime),
	);
	auction.yield = auctionDTO.yield;
	auction.rate = auctionDTO.rate;
	auction.discount = auctionDTO.discount;

	const newAuction = await AppDataSource.getRepository(Auction).save(auction);
	return (
		"Your auction has been successfully saved under id" +
		newAuction.auctionId
	);
};

export const getAuctions = async (): Promise<Auction[]> => {
	return await AppDataSource.getRepository(Auction).find({
		order: {
			auctionDate: "ASC",
		},
	});
};

export const resolveAuctions = async (): Promise<string> => {
	const now = new Date();
	const auctions = await AppDataSource.getRepository(Auction).find({
		where: {
			nonCompetitiveBidCloseTime: LessThan(now),
			competitiveBidCloseTime: LessThan(now),
			resolved: false,
		},
		order: {
			auctionDate: "ASC",
		},
	});

	if (auctions.length > 0) {
		auctions.map((auction) => resolveAuction(auction));
		return "Auctions resolved, bids awarded according to auction rules";
	}
	return "No auctions to be resolved";
};

export const getPurchases = async (): Promise<Purchase[]> => {
	return await AppDataSource.getRepository(Purchase).find({
		relations: {
			auction: true,
			bid: {
				user: true,
			},
		},
		order: {
			purchaseId: "DESC",
		},
	});
};
