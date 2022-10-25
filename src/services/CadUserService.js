const db = require("../Connection/db");

module.exports = {
    insert: (Nome, Senha) => {
        return new Promise((aceito, rejeitado) => {
            db.query("INSERT INTO usuarios(nome, senha) VALUES (?, ?)",
                [Nome, Senha],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results.insertCodigo);
                }
            );
        });
    },
}
