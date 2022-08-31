import { generateToken, validateToken } from "../authService";

describe("generateToken tests", () => {
	test("generateTokenString", () => {
		expect(generateToken("ada")).toBeInstanceOf<string>;
	});

	test("generateTokenPattern", () => {
		expect(generateToken("ada")).toMatch(/.*\..*\..*/);
	});
});

describe("validateToken tests", () => {
	test("validateTokenOK", () => {
		const token = generateToken("ada");
		expect(validateToken(token)).toBe("ada");
	});

	test("validateTokenNotOK", () => {
		expect(() => {
			validateToken("");
		}).toThrow();
	});
});
