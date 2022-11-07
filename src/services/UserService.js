const db = require("../connection/db");

module.exports = {
    Insert: (Nome, Email, Senha) => {
        return new Promise((accepted, rejected) => {
            db.query("INSERT INTO usuarios(name, email, password) VALUES (?, ?, ?)", [Nome, Email, Senha], (error, results) => {
                if (error) { rejected(error); return; };
                accepted(results);
            });
        });
    },
    Login: (Email, Senha) => {
        return new Promise((accepted, rejected) => {
            db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?;", [Email, Senha], (error, results) => {
                if (error) { rejected(error); return; };
                accepted(results);
            });
        });
    }
}