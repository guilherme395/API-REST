const db = require("../connection/db");

module.exports = {
    Insert: (Nome, Email, Senha) => {
        return new Promise((aceito, rejeitado) => {
            db.query("INSERT INTO usuarios(name, email, password) VALUES (?, ?, ?)", [Nome, Email, Senha], (error, results) => {
                if(error){ rejeitado(error); return; };
                aceito(results);
            });
        });
    }
}