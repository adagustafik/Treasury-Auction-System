import { AppDataSource } from "./db/dataSource";

export const setupDB = async () => {
	await AppDataSource.initialize()
		.then(() => {
			console.log(`Data Source has been initialized!`);
		})
		.catch((err) => {
			console.error("Error during Data Source initialization", err);
		});
};
