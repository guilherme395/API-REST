require("dotenv/config");
const knex = require("knex");
const config = require("./knexfile.js");

class Conn {
  constructor() {
    return knex(config);
  }
}

module.exports = new Conn();
