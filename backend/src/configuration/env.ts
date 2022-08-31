import "dotenv/config";

export const {
	port,
	db_host,
	db_username,
	db_password,
	db_name,
	secretKey,
	origin,
} = process.env;
let db_port_temp;
if (process.env.db_port) {
	db_port_temp = parseInt(process.env.db_port);
}
export const db_port = db_port_temp;
