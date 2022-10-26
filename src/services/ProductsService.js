const db = require("../Connection/db");

module.exports = {
    SearchAll: () => {
        return new Promise((aceito, rejeitado) => {
            db.query("SELECT * FROM produtos", (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    SearchOne: (Codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query("SELECT * FROM produtos WHERE codigo = ?", [Codigo], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },
    Insert: (Produto, Descricao, Valor) => {
        return new Promise((aceito, rejeitado) => {
            db.query("INSERT INTO produtos (produto, descricao, valor) VALUES (?, ?, ?)", [Produto, Descricao, Valor], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },
    Alter: (Produto, Descricao, Valor, Codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query("UPDATE produtos SET produto = ?, descricao = ?, valor = ? WHERE codigo = ?", [Produto, Descricao, Valor, Codigo], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    Delete: (Codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query("DELETE FROM produtos WHERE codigo = ?", [Codigo], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    DeleteAll: () => {
        return new Promise((aceito, rejeitado) => {
            db.query("DELETE FROM produtos", (error, results) => {
                if (error) { rejeitado(error); return }
                aceito(results);
            });
        });
    }
}