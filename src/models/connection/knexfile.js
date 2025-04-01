require("dotenv/config");

module.exports = {
  client: "mysql2",
  connection: {
    user: "root",
    password: "root",
    database: "test",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
