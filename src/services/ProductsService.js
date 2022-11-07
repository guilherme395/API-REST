const db = require("../connection/db");

module.exports = {
    SearchAll: () => {
        return new Promise((accepted, rejected) => {
            db.query("SELECT * FROM produtos", (error, results) => {
                if (error) { rejected(error); return; }
                accepted(results);
            });
        });
    },
    SearchOne: (Codigo) => {
        return new Promise((accepted, rejected) => {
            db.query("SELECT * FROM produtos WHERE codigo = ?", [Codigo], (error, results) => {
                if (error) { rejected(error); return; }
                if (results.length > 0) {
                    accepted(results[0]);
                } else {
                    accepted(false);
                }
            });
        });
    },
    Insert: (Produto, Descricao, Valor) => {
        return new Promise((accepted, rejected) => {
            db.query("INSERT INTO produtos (produto, descricao, valor) VALUES (?, ?, ?)", [Produto, Descricao, Valor], (error, results) => {
                if (error) { rejected(error); return; }
                accepted(results);
            });
        });
    },
    Alter: (Codigo, Produto, Descricao, Valor) => {
        return new Promise((accepted, rejected) => {
            db.query("UPDATE produtos SET produto = ?, descricao = ?, valor = ? WHERE codigo = ?", [Produto, Descricao, Valor, Codigo], (error, results) => {
                if (error) { rejected(error); return; }
                accepted(results);
            });
        });
    },
    Delete: (Codigo) => {
        return new Promise((accepted, rejected) => {
            db.query("DELETE FROM produtos WHERE codigo = ?", [Codigo], (error, results) => {
                if (error) { rejected(error); return; }
                accepted(results);
            });
        });
    },
    DeleteAll: () => {
        return new Promise((accepted, rejected) => {
            db.query("DELETE FROM produtos", (error, results) => {
                if (error) { rejected(error); return }
                accepted(results);
            });
        });
    }
}