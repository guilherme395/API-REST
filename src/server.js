require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/api', routes);

server.use((req, res, next) => {
    const erro = new Error("A rota requisitada não foi encontrada");
    erro.status = 404;
    next(erro);
});

server.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        Erro: {
            mensagem: error.message
        }
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});
