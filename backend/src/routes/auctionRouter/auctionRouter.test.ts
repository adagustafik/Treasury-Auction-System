import { setupServer } from "../../setupServer";
import { Server } from "http";
import { setupDB } from "../../setupDB";
import { generateToken } from "../../services";
import { AppDataSource, Auction, User } from "../../db";
import request from "supertest";

let server: Server;
let userCreated: User;
const token = generateToken("Bider");

beforeAll(async () => {
	server = setupServer();
	await setupDB();

	const user = new User();
	user.userName = "Bider";
	user.password = "Testing1!";
	user.email = "bider@sk.sk";
	userCreated = await AppDataSource.getRepository(User).save(user);
});

afterAll(async () => {
	await AppDataSource.getRepository(User).remove(userCreated);
	await AppDataSource.destroy();
	server.close();
});

describe("GET /auctions", () => {
	test("authorized returns status code 200 and an array of auctions", async () => {
		const auction = new Auction();
		auction.securityOffered = 50000;
		auction.auctionDate = new Date(2022, 9, 1, 12, 0, 0, 0);
		auction.issueDate = new Date(2022, 9, 1, 12, 0, 0, 0);
		auction.maturityDate = new Date(2022, 3, 1, 12, 0, 0, 0);
		auction.termsAndConditions = "General terms and conditions apply.";
		auction.nonCompetitiveBidCloseTime = new Date(2022, 9, 2, 12, 0, 0, 0);
		auction.competitiveBidCloseTime = new Date(2022, 9, 2, 13, 0, 0, 0);
		auction.yield = 0.5;
		auction.rate = 0.5;
		auction.discount = 0.5;
		const auctionSaved = await AppDataSource.getRepository(Auction).save(
			auction,
		);

		const res = await request(server)
			.get("/auctions")
			.set("Cookie", `token=${token}`);

		expect(res.statusCode).toEqual(200);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toEqual(
			expect.arrayContaining([expect.objectContaining(new Auction())]),
		);

		await AppDataSource.getRepository(Auction).remove(auctionSaved);
	});
});
