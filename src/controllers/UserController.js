const UserService = require("../services/UserService");

module.exports = {
    Insert: async (req, res) => {
        let Nome = req.body.name;
        let Email = req.body.email;
        let Senha = req.body.password;
        if (Nome && Email && Senha) {
            const result = await UserService.Insert(Nome, Email, Senha);
            if (result.affectedRows != 0) {
                res.status(201).send({
                    Success: {
                        Message: "Usuario Cadastrado Com Sucesso!",
                        UserInserted: {
                            Codigo: result.insertId,
                            Nome: Nome,
                            Email: Email,
                        }
                    }
                });
            } else {
                res.status(500).send({
                    Error: {
                        Message: "Erro Ao Cadastrar Usuario, Tente Novamente Mais Tarde!",
                    }
                });
            }
        } else {
            res.status(400).send({
                Error: {
                    Message: "Dados Insuficiente, Preencha Todos os Campos e Tente Novamente!",
                }
            });
        }
        res.json();
    },
    Login: async (req, res) => {
        Email = req.body.email;
        Senha = req.body.password;

        if (Email && Senha) {
            const result = await UserService.Login(Email, Senha);
            if (result.affectedRows != 0) {
                res.status(200).send({
                    Success: {
                        Message: "Usuario Autenticado!",
                        result: result
                    }
                });
            } else {
                res.status(400).send({
                    Error: {
                        Message: "Usuario Não Autenticado!"
                    }
                });
            }
        } else {
            res.status(400).send({
                Error: {
                    Message: "Email ou Senha Incompleto!"
                }
            })
        }
        res.json();
    }
}