import { UnauthorizedError } from "../../../errors";
import { loginUser } from "../authService";
import { LoginDTO } from "../../../dtos";

jest.mock("../../../db/dataSource", () => {
	return {
		__esModule: true,
		AppDataSource: {
			getRepository: () => {
				return {
					findOneBy: () => {
						return {
							userName: "Gyulabodor9555",
							isAdmin: true,
							email: "gyula@hu.hu",
						};
					},
				};
			},
		},
	};
});

describe("Login service tests", () => {
	test("loginUserOK", async () => {
		const loginDto = new LoginDTO();
		loginDto.userName = "Gyulabodor9555";
		loginDto.password = "pasS32word";

		expect(await loginUser(loginDto)).toStrictEqual({
			userName: loginDto.userName,
			isAdmin: true,
			email: "gyula@hu.hu",
		});
	});

	test("loginUserNotOK", async () => {
		const loginDto = new LoginDTO();
		loginDto.userName = "Gyulabodor9555";
		loginDto.password = "pasS32word";

		expect(async () => {
			await loginUser(loginDto);
		}).toBeInstanceOf<UnauthorizedError>;
	});
});
