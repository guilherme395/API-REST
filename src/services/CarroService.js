const db = require("../connection/db");

module.exports = {
    searchAll: () => {
        return new Promise((accepted, rejected) => {
            db.query("SELECT * FROM carros", (error, results) => {
                if (error) { rejected(error); return; }
                accepted(results);
            });
        });
    },
    searchOne: (codigo) => {
        return new Promise((accepted, rejected) => {
            db.query("SELECT * FROM carros WHERE codigo = ?", [codigo], (error, results) => {
                if (error) { rejected(error); return; }
                if (results.length > 0) {
                    accepted(results[0]);
                } else {
                    accepted(false);
                }
            });
        });
    },
    insert: (modelo, placa) => {
        return new Promise((accepted, rejected) => {
            db.query("INSERT INTO carros (modelo, placa) VALUES (?, ?)",
                [modelo, placa],
                (error, results) => {
                    if (error) { rejected(error); return; }
                    accepted(results.insertId);
                }
            );
        });
    },
    alter: (codigo, modelo, placa) => {
        return new Promise((accepted, rejected) => {
            db.query("UPDATE carros SET modelo = ?, placa = ? WHERE codigo = ?",
                [modelo, placa, codigo],
                (error, results) => {
                    if (error) { rejected(error); return; }
                    accepted(results);
                }
            );
        });
    },
    delete: (codigo) => {
        return new Promise((accepted, rejected) => {
            db.query("DELETE FROM carros WHERE codigo = ?", [codigo], (error, results) => {
                if (error) { rejected(error); return; }
                accepted(results);
            });
        });
    },
    deleteAll: () => {
        return new Promise((accepted, rejected) => {
            db.query("DELETE FROM carros", (error, results) => {
                if (error) { rejected(error); return; }
                accepted(results);
            });
        });
    }
};