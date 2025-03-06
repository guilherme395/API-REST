const knex = require("knex");

class Connection {
	constructor() {
		this.connection = knex({
			client: process.env.CLIENT,
			connection: {
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				user: process.env.DB_USER,
				password: process.env.DB_PASS,
				database: process.env.DB_NAME,
			},
		});
	}

	getConnection() {
		return this.connection;
	}
}

export default new Connection().getConnection();
