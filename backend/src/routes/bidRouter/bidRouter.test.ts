import { setupServer } from "../../setupServer";
import { setupDB } from "../../setupDB";
import request from "supertest";
import { AppDataSource, Auction, Bid, User } from "../../db";
import { Server } from "http";
import { generateToken } from "../../services";

let server: Server;
let userCreated: User;
let auctionCreated: Auction;
const token = generateToken("Bider");
const nowDate = new Date();
const nowDateString = nowDate.toISOString();

beforeAll(async () => {
	server = setupServer();
	await setupDB();

	const user = new User();
	user.userName = "Bider";
	user.password = "Testing1!";
	user.email = "bider@sk.sk";
	userCreated = await AppDataSource.getRepository(User).save(user);

	const auction = new Auction();
	auction.securityOffered = 1000000;
	const hourAgo = Date.now() - 60 * 60;
	auction.auctionDate = new Date(hourAgo);
	auction.issueDate = new Date(2022, 8, 1, 12, 0, 0, 0);
	auction.maturityDate = new Date(2023, 2, 1, 12, 0, 0, 0);
	auction.termsAndConditions = "General terms and conditions apply";
	const dayLater = Date.now() + 60 * 60 * 24;
	auction.nonCompetitiveBidCloseTime = new Date(dayLater);
	const twoDaysLater = Date.now() + 60 * 60 * 24 * 2;
	auction.competitiveBidCloseTime = new Date(twoDaysLater);
	auction.yield = 25;
	auction.rate = 20;
	auction.discount = 0.5;
	auctionCreated = await AppDataSource.getRepository(Auction).save(auction);
});

afterAll(async () => {
	await AppDataSource.getRepository(User).remove(userCreated);
	await AppDataSource.getRepository(Auction).remove(auctionCreated);
	await AppDataSource.destroy();
	server.close();
});

describe("POST /bid/bid", () => {
	test("save new bid returns status code 201 and success json object", async () => {
		const res = await request(server)
			.post("/bid/bid")
			.set("Cookie", `token=${token}`)
			.send({
				time: nowDateString,
				type: "comp",
				amount: 1000,
				rate: 22,
				username: userCreated.userName,
				auctionid: auctionCreated.auctionId,
			});

		expect(res.statusCode).toEqual(201);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toHaveProperty("success");
		expect(res.body.success).toEqual(
			"Bid taken for auction id: " +
				auctionCreated.auctionId +
				" user: " +
				userCreated.userName,
		);

		const bidRepo = AppDataSource.getRepository(Bid);
		const bidTaken = await bidRepo.findOneBy({ user: userCreated });
		if (bidTaken) {
			await bidRepo.remove(bidTaken);
		}
	});

	test("not validated - empty values - returns status code 400 and error message", async () => {
		const res = await request(server)
			.post("/bid/bid")
			.set("Cookie", `token=${token}`)
			.send({
				time: "",
				type: "",
				amount: 0,
				username: "",
				auctionid: 0,
			});

		expect(res.statusCode).toEqual(400);
		expect(res.type).toEqual("text/html");
		expect(res.text).toEqual(expect.any(String));
	});

	test("validated - not valid auctionId provided  - returns status code 400 and error message", async () => {
		const res = await request(server)
			.post("/bid/bid")
			.set("Cookie", `token=${token}`)
			.send({
				time: nowDateString,
				type: "noncomp",
				amount: 1000,
				username: userCreated.userName,
				auctionid: -1,
			});

		expect(res.statusCode).toEqual(400);
		expect(res.type).toEqual("text/html");
		expect(res.text).toEqual("Invalid auction");
	});
});

describe("GET /bid/bids", () => {
	test("authorized returns status code 200 and an array of bids", async () => {
		const bid = new Bid();
		bid.time = nowDate;
		bid.type = "noncomp";
		bid.amount = 1000;
		bid.user = userCreated;
		bid.auction = auctionCreated;
		const bidSaved = await AppDataSource.getRepository(Bid).save(bid);
		const res = await request(server)
			.get("/bid/bids")
			.set("Cookie", `token=${token}`)
			.send({
				username: userCreated.userName,
			});

		expect(res.statusCode).toEqual(200);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toEqual(
			expect.arrayContaining([expect.objectContaining(new Bid())]),
		);

		await AppDataSource.getRepository(Bid).remove(bidSaved);
	});
});
