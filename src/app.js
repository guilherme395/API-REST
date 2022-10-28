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
const CadUserRoute = require("./routes/CadUser-route");


app.use("/api/v1/carros", CarRoute);
app.use("/api/v1/produtos", ProductsRoute);
app.use("/api/v1/cadastrar", CadUserRoute);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).send({});
    }
    next();
});

app.use((req, res, next) => {
    erro.status = 404;
    const erro = new Error("A URL Solicitada Não Existe!");
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