const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./banco.db', (err) => {
    if (err) {
        console.error('Erro ao conectar no banco:', err.message);
    } else {
        console.log('Conectado ao banco SQLite!');
    }
});

// Criar tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    preco REAL,
    descricao TEXT,
    quantidade INTEGER
)`);

module.exports = db; 
