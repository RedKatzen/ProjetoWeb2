var sqlite3 = require('sqlite3');

class DBConn {

    constructor() {
        this.db = new sqlite3.Database('db/dev.db');
        this.createTables();
    }

    getLastInsertRowId(callback) {
        return this.db.get('SELECT last_insert_rowid()', callback);
    }


    createTables() {
        var sql = `CREATE TABLE IF NOT EXISTS contas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL)`;

        return this.db.run(sql);
    }

    createConta(nome, callback) {
        var sql = 'INSERT INTO contas (nome) VALUES (?)';
        return this.db.run(sql, [nome], callback);
    }

    updateConta(id, nome, callback) {
        var sql = 'UPDATE contas SET nome = (?) WHERE ID = (?)';
        return this.db.run(sql, [nome, id], callback);
    }

    GetContaById(id, callback) {
        var sql = 'SELECT * FROM contas WHERE ID = (?)';
        return this.db.get(sql, id, callback);
    }    

    findAllContas(callback) {
        var sql = 'SELECT * FROM contas';
        return this.db.all(sql, [], callback);
    }

    deleteContas(id, callback) {
        var sql = 'DELETE FROM contas WHERE ID = (?)';
        return this.db.run(sql, id, callback);
    }    


}

module.exports = DBConn