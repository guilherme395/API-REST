import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes.js";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("tiny"));
server.use(cors());

server.use("/api", routes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, "0.0.0.0", () => {
	console.log(`Servidor backend iniciado em http://127.0.0.1:${PORT}`);
});
