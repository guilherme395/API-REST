const CadUserService = require("../services/CadUserService");

module.exports = {
    Create: async (req, res) => {
        let Nome = req.body.Nome;
        let Senha = req.body.Senha;

        if (Nome && Senha) {
            await CadUserService.insert(Nome, Senha);
            res.status(200).send({
                Sucess: {
                    Message: "Usuario Cadastrado Com Sucesso!",
                }
            });
        } else {
            res.status(401).send({
                Error:{
                    Message: "Usuario Não Cadastrado, Dados Insuficiente!"
                } 
            });
        }
        res.json();
    },
    Delete: async (req, res) => {

    }
}