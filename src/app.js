require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors())

const CarRoute = require("./routes/cars-route");
const ProductsRoute = require("./routes/products-route");
const UserRouter = require("./routes/User-route");

app.use("/api/v1/carros", CarRoute);
app.use("/api/v1/produtos", ProductsRoute);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/user", UserRouter);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).send({});
    }
    next();
});

app.use((req, res, next) => {
    const erro = new Error("A URL Solicitada Não Existe!");
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        Error: {
            Message: error.message
        }
    });
});

module.exports = app;