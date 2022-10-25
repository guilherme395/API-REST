const CarroService = require("../services/CarroService");

module.exports = {

    searchAll: async (req, res) => {
        let objectJson = [];
        let carros = await CarroService.searchAll();
        for (let i in carros) {
            objectJson.push({
                codigo: carros[i].codigo,
                modelo: carros[i].modelo,
                placa: carros[i].placa
            });
        }

        res.json(objectJson);
    },

    searchOne: async (req, res) => {
        let codigo = req.params.codigo; //para pegar o parametro
        let carro = await CarroService.searchOne(codigo);
        if (carro) {
            res.status(200).send({
                sucessMessage: carro
            });
        } else {
            res.status(404).send({
                errorMessage: "CARRO NÃO ENCONTRADO !!!"
            });
        }

        res.json();
    },

    insert: async (req, res) => {
        let modelo = req.body.modelo;
        let placa = req.body.placa;

        if (modelo && placa) {
            let CarroCodigo = await CarroService.insert(modelo, placa);
            res.status(200).send({
                Sucess: {
                    Message: "Veiculo Inserido com sucesso !!!",
                    VeiculoInserido: {
                        Modelo: modelo,
                        Placa: placa
                    }
                }
            });
        } else {
            res.status(404).send({
                Error:{
                    Message: "VEICULO NÃO CADASTRADO, DADOS INSUFICIENTE !!!"
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
            res.status(200).send({
                Sucess: {
                    Message: "Veiculo Alterado com sucesso !!!",
                    VeiculoInserido: {
                        Codigo: codigo,
                        Modelo: modelo,
                        Placa: placa
                    }
                }
            });
        } else {
            res.status(404).send({
                Error: {
                    Message: "POR ALGUM MOTIVO, OS DADOS NÃO FORAM ATUALIZADOS !!!"
                }
            });
        }
        res.json();
    },
    delete: async (req, res) => {
        const result = await CarroService.delete(req.params.codigo);
        if (result.affectedRows != 0) {
            res.status(200).send({
                sucessMessage: "EXCLUIDO COM SUCESSO",
            });
        } else {
            res.status(404).send({
                errorMessage: "ERRO AO delete, VERIFIQUE O CODIGO PASSADO POR PARAMETRO !!!",
            });
        }
        res.json();
    },
}
