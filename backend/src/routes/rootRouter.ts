import { Router } from "express";
import { authRouter, updateRouter } from "./authRouter";
import { auctionRouter, adminRouter } from "./auctionRouter";
import { bidRouter } from "./bidRouter";

export const rootRouter = Router();

rootRouter.use("/", authRouter);
rootRouter.use("/update", updateRouter);
rootRouter.use("/", auctionRouter);
rootRouter.use("/bid", bidRouter);
rootRouter.use("/auction", adminRouter);
