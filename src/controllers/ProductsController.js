const ProductsService = require("../services/ProductsService");

module.exports = {
    SearchAll: async (req, res) => {
        let objectJson = [];
        let Product = await ProductsService.SearchAll();
        for (let i in Product) {
            objectJson.push({
                Codigo: Product[i].codigo,
                Produto: Product[i].produto,
                Descricao: Product[i].descricao,
                Valor: Product[i].valor,
            });
        }
        res.json(objectJson);
    },
    SearchOne: async (req, res) => {
        let codigo = req.params.idProduct;
        let Product = await ProductsService.SearchOne(codigo);
        if (Product) {
            res.status(200).send({
                Success: {
                    Message: "Aqui Esta o Produto Que Voce Queria!",
                    Product: Product
                }
            });
        } else {
            res.status(400).send({
                Error: {
                    Message: `Erro ao Busca o Produto com o Codigo ${codigo} !`
                }
            });
        }
        res.json()
    },
    Insert: async (req, res) => {
        let Produto = req.body.produto;
        let Descricao = req.body.descicao;
        let Valor = req.body.valor;
        if (Produto && Descricao && Valor) {
            let codProduct = await ProductsService.Insert(Produto, Descricao, Valor);
            res.status(201).send({
                Success: {
                    Message: "Produto Criado Com Sucesso!",
                    ProductInserted: {
                        Codigo: codProduct,
                        Produto: Produto,
                        Descricao: Descricao,
                        Valor: Valor
                    }
                }
            });
        } else {
            res.status(400).send({
                Error: {
                    Message: "Dados Insuficiente, Por favor Preencher Todos os Campos!"
                }
            });
        }
        res.json();
    },
    Alter: async (req, res) => {
        let Codigo = req.params.idProduct;
        let Produto = req.body.produto;
        let Descricao = req.body.descicao;
        let Valor = req.body.valor;
        if (Codigo && Produto && Descricao && Valor) {
            await ProductsService.Alter(Codigo, Produto, Descricao, Valor);
            res.status(200).send({
                Success: {
                    Message: "Produto Alterado com Sucesso!",
                    ProductAltered: {
                        Codigo: Codigo,
                        Produto: Produto,
                        Descricao: Descricao,
                        Valor: Valor
                    }
                }
            });
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
        const result = await ProductsService.Delete(req.params.idProduct);
        if (result.affectedRows != 0) {
            res.status(200).send({
                Success: {
                    Message: "Produto Excluido Com Sucesso!"
                }
            });
        } else {
            res.status(400).send({
                Error: {
                    Message: "Erro Ao Deletar o Produto, Verifique o Codigo, e Tente Novamente!"
                }
            })
        }
        res.json();
    },
    DeleteAll: async (req, res) => {
        const result = await ProductsService.DeleteAll();
        if (result.affectedRows != 0) {
            res.status(200).send({
                Success: {
                    Message: "Todos os Produtos Foram Excluido Com Sucesso!"
                }
            });
        } else {
            res.status(400).send({
                Error: {
                    Message: "Erro ao Deletar Todos os Produtos!"
                }
            });
        }
        res.json();
    }
}