import { setupServer } from "../../setupServer";
import { setupDB } from "../../setupDB";
import request from "supertest";
import { AppDataSource } from "../../db";
import { User } from "../../db";
import { Server } from "http";
import { generateToken } from "../../services";
import { TOKEN_PATTERN } from "../../configuration";

let server: Server;
let userCreated: User;

beforeAll(async () => {
	server = setupServer();
	await setupDB();

	const user = new User();
	user.userName = "Testobot";
	user.password = "Testing1!";
	user.email = "testobot@sk.sk";
	userCreated = await AppDataSource.getRepository(User).save(user);
});

afterAll(async () => {
	await AppDataSource.getRepository(User).remove(userCreated);
	await AppDataSource.destroy();
	server.close();
});

describe("POST /register", () => {
	test("validated returns status code 201 and success json object", async () => {
		const res = await request(server).post("/register").send({
			username: "Maria",
			password: "Testing1!",
			email: "maria@sk.sk",
		});

		expect(res.statusCode).toEqual(201);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toHaveProperty("success");
		expect(res.body.success).toEqual(
			"Dear Maria, you have been successfully registered!",
		);

		const userRepo = AppDataSource.getRepository(User);
		const userMaria = await userRepo.findOneBy({ userName: "Maria" });
		if (userMaria) {
			await userRepo.remove(userMaria);
		}
	});

	test("not validated returns status code 400 and error message", async () => {
		const res = await request(server).post("/register").send({
			username: "Ma",
			password: "Testing1",
			email: "maria@sk",
		});

		expect(res.statusCode).toEqual(400);
		expect(res.type).toEqual("text/html");
		expect(res.text).toEqual(expect.any(String));
	});

	test("validated user already exists returns status code 422 and error message", async () => {
		const res = await request(server).post("/register").send({
			username: "Testobot",
			password: "Testing1!",
			email: "testobot@sk.sk",
		});

		expect(res.statusCode).toEqual(422);
		expect(res.type).toEqual("text/html");
		expect(res.text).toEqual("Username already exists");
	});
});

describe("POST /login", () => {
	test("validated returns status code 200 and adds token cookie", async () => {
		const res = await request(server).post("/login").send({
			username: "Testobot",
			password: "Testing1!",
		});

		expect(res.statusCode).toEqual(200);
		expect(res.headers).toEqual(
			expect.objectContaining({
				"set-cookie": expect.arrayContaining([
					expect.stringMatching(TOKEN_PATTERN),
				]),
			}),
		);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toHaveProperty("username");
		expect(res.body.username).toEqual("Testobot");
		expect(res.body).toHaveProperty("admin");
		expect(res.body.admin).toEqual(false);
		expect(res.body).toHaveProperty("email");
		expect(res.body.email).toEqual("testobot@sk.sk");
	});

	test("wrong password returns status code 401 and error message", async () => {
		const res = await request(server).post("/login").send({
			username: "Testobot",
			password: "Testing1!!",
		});

		expect(res.statusCode).toEqual(401);
		expect(res.headers).toEqual(
			expect.not.objectContaining({
				"set-cookie": expect.arrayContaining([
					expect.stringMatching(TOKEN_PATTERN),
				]),
			}),
		);
		expect(res.type).toEqual("text/html");
		expect(res.text).toEqual("Username or Password are not valid!");
	});

	test("unregistered user returns status code 401 and error message", async () => {
		const res = await request(server).post("/login").send({
			username: "Testobot2",
			password: "Testing1!",
		});

		expect(res.statusCode).toEqual(401);
		expect(res.headers).toEqual(
			expect.not.objectContaining({
				"set-cookie": expect.arrayContaining([
					expect.stringMatching(TOKEN_PATTERN),
				]),
			}),
		);
		expect(res.type).toEqual("text/html");
		expect(res.text).toEqual("Username or Password are not valid!");
	});
});

describe("POST /logout", () => {
	const token = generateToken("Testobot");

	test("registered user returns status code 200 and token cookie is removed", async () => {
		const res = await await request(server)
			.post("/logout")
			.set("Cookie", `token=${token}`);

		expect(res.statusCode).toEqual(200);
		expect(res.headers).toEqual(
			expect.not.objectContaining({
				"set-cookie": expect.arrayContaining([
					expect.stringMatching(TOKEN_PATTERN),
				]),
			}),
		);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toHaveProperty("success");
		expect(res.body.success).toEqual("You were successfully logged out.");
	});
});
