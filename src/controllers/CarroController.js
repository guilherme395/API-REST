const CarroService = require("../services/CarroService");

module.exports = {

    searchAll: async (req, res) => {
        let objectJson = [];
        let car = await CarroService.searchAll();
        for (let i in car) {
            objectJson.push({
                codigo: car[i].codigo,
                modelo: car[i].modelo,
                placa: car[i].placa
            });
        }
        res.json(objectJson);
    },
    searchOne: async (req, res) => {
        let codigo = req.params.codigo; //para pegar o parametro
        let car = await CarroService.searchOne(codigo);
        if (car) {
            res.status(201).send({
                Success: {
                    Message: "Sucesso, Aqui Esta o que Você Procura!",
                    Vehicle: car
                }
            });
        } else {
            res.status(400).send({
                Error: {
                    Message: "Veiculo Não Encontrado, Verifique o Codigo, e Tente Novamente!"
                }
            });
        }
        res.json();
    },
    insert: async (req, res) => {
        let modelo = req.body.modelo;
        let placa = req.body.placa;

        if (modelo && placa) {
            let CarroCodigo = await CarroService.insert(modelo, placa);
            res.status(201).send({
                Success: {
                    Message: "Veiculo Inserido com Sucesso !!!",
                    vehicleInserted: {
                        codigo: CarroCodigo,
                        Modelo: modelo,
                        Placa: placa
                    }
                }
            });
        } else {
            res.status(400).send({
                Error: {
                    Message: "Veiculo Não Cadastrado, Dados Insuficiente!"
                }
            });
        }
        res.json();
    },
    alter: async (req, res) => {
        let codigo = req.params.codigo;
        let modelo = req.body.modelo;
        let placa = req.body.placa;
        if (codigo && modelo && placa) {
            await CarroService.alter(codigo, modelo, placa);
            res.status(201).send({
                Success: {
                    Message: "Veiculo Alterado Com Sucesso!",
                    VeiculoInserido: {
                        Codigo: codigo,
                        Modelo: modelo,
                        Placa: placa
                    }
                }
            });
        } else {
            res.status(400).send({
                Error: {
                    Message: "Por Algum Motivo os Dados Não Foram Atualizados!"
                }
            });
        }
        res.json();
    },
    delete: async (req, res) => {
        const result = await CarroService.delete(req.params.codigo);
        if (result.affectedRows != 0) {
            res.status(201).send({
                Success: {
                    Message: "Carro Excluido Com Sucesso!",
                }
            });
        } else {
            res.status(400).send({
                Error: {
                    Message: "Erro ao Deletar, Verifique o Codigo, e Tente Novamente!",
                }
            });
        }
        res.json();
    },
}