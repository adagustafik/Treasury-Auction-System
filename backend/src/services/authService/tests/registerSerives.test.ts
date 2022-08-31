import { UserDTO } from "../../../dtos";
import { UnprocessableEntityError } from "../../../errors";
import { registerNewUser } from "../authService";

jest.mock("../../../db/dataSource", () => {
	return {
		__esModule: true,
		AppDataSource: {
			getRepository: () => {
				return {
					save: () => {
						return {
							userName: "Gyulabodor9555",
						};
					},
					findOneBy: () => {
						return null;
					},
				};
			},
		},
	};
});

describe("Register service tests", () => {
	test("registerNewUserOK", async () => {
		const userDto = new UserDTO();
		userDto.userName = "Gyulabodor9555";
		userDto.password = "pasS32word";
		userDto.email = "gyula@email.com";

		expect(await registerNewUser(userDto)).toBe(
			"Dear " +
				userDto.userName +
				", you have been successfully registered!",
		);
	});

	test("registerNewNotOK", async () => {
		const userDto = new UserDTO();
		userDto.userName = "Gyulabodor9555";
		userDto.password = "pasS32word";
		userDto.email = "gyula@email.com";

		expect(async () => {
			await registerNewUser(userDto);
		}).toBeInstanceOf<UnprocessableEntityError>;
	});
});
