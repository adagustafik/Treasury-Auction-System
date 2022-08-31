import { DataSource } from "typeorm";
import {
	db_host,
	db_port,
	db_username,
	db_password,
	db_name,
} from "../configuration/env";
import { User, Auction, Bid, Purchase } from "./entities";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: db_host,
	port: db_port,
	username: db_username,
	password: db_password,
	database: db_name,
	entities: [User, Auction, Bid, Purchase],
	synchronize: true,
	logging: false,
});
