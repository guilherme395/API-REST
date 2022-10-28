const CadUserService = require("../services/CadUserService");

module.exports = {
    SearchAll: async (req, res) => {
        let objectJson = [];
        let users = await CadUserService.SearchAll();
        for (let i in users) {
            objectJson.push({
                Nome: "Guilherme",
                Email: "guilhermell@live.com",
                Senha: "G@bi9315"
            });
        }
        res.json(objectJson);
    },
    SearchOne: async(req, res) => {
        const User = await CadUserService.SearchOne(req.params.idUser);
        if(User){
            res.status(200).send({
                Success: {
                    Message: "Aqui Esta o Usuario Que Voce Procura!",
                    User: User
                }
            });
        } else {
            res.status(400).send({
                Error: {
                    Message: "Por Favor Passar um Codigo para Exclusão de Usuario!"
                }
            });
        }
        res.json();
    },
    Insert: async (req, res) => {
        let Nome = req.body.name;
        let Email = req.body.email;
        let Senha = req.body.password;
        if (Nome && Email && Senha) {
            const result = await CadUserService.Insert(Nome, Email, Senha);
            if (result.affectedRows != 0) {
                res.status(201).send({
                    Success: {
                        Message: "Usuario Cadastrado com Sucesso!",
                        UserInserted: {
                            Codigo: result.insertId,
                            Nome: Nome,
                            Email: Email,
                            Senha: "SECRET"
                        }
                    }
                });
            } else {
                res.status(500).send({
                    Error: {
                        Message: "Por Algum Motivo o Usuario Não Foi Cadastrado, Tente Novamente Mais Tarde!"
                    }
                });
            }
        } else {
            res.status(400).send({
                Error: {
                    Message: "Dados Insuficiente, Por favor Preencher Todos os Campos!"
                }
            });
        }
        res.json();
    },
    Delete: async (req, res) => {
    }
}