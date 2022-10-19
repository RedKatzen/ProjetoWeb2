var sqlite3 = require('sqlite3');

class DBConn {

    constructor() {
        this.db = new sqlite3.Database('C:/Program Files/SQLiteStudio/db');
        this.createTables();
    }

    getLastInsertRowId(callback) {
        return this.db.get('SELECT last_insert_rowid()', callback);
    }

    createTables() {
        var sql = `CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL)`;

        return this.db.run(sql);
    }

    createConta(nome, callback) {
        var sql = 'INSERT INTO accounts (nome) VALUES (?)';
        return this.db.run(sql, [nome], callback);
    }

    updateConta(id, nome, callback) {
        var sql = 'UPDATE accounts SET nome = (?) WHERE ID = (?)';
        return this.db.run(sql, [nome, id], callback);
    }

    GetContaById(id, callback) {
        var sql = 'SELECT * FROM accounts WHERE ID = (?)';
        return this.db.get(sql, id, callback);
    }    

    findAllContas(callback) {
        var sql = 'SELECT * FROM accounts';
        return this.db.all(sql, [], callback);
    }

    deleteConta(id, callback) {
        var sql = 'DELETE FROM accounts WHERE ID = (?)';
        return this.db.run(sql, id, callback);
    }    
}

module.exports = DBConn