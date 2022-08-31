import express from "express";
import cors from "cors";
import { origin, port } from "./configuration";
import { rootRouter } from "./routes/rootRouter";
import { errorHandler } from "./middlewares";

export const setupServer = () => {
	const app = express();
	app.use(cors({ origin: origin, credentials: true }));
	app.use(express.json());
	app.use(rootRouter);
	app.use(errorHandler);

	const server = app.listen(port);
	console.log("server listening on port ", port);

	return server;
};
