require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes.cjs");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("tiny"));
server.use(cors({ origin: "*", methods: "*" }));

server.use("/api", routes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor backend iniciado em http://127.0.0.1:${PORT}`);
});
