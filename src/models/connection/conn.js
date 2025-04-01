import "dotenv/config";
import knex from "knex";

class conn {
  constructor() {
    this.config = {
      client: process.env.DB_CLIENT,
      connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      },
      migrations: {
        directory: "./migrations",
      },
      seeds: {
        directory: "./seeds",
      },
    };

    this.conn = knex(this.config);
  }

  getConnection() {
    return this.conn;
  }
}

export default new conn().getConnection();
