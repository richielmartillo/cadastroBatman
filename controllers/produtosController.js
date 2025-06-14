const db = require('../models/db');

exports.getAll = (req, res) => {
    db.all('SELECT * FROM produtos', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json(row);
    });
};

exports.create = (req, res) => {
    const { nome, preco, descricao, quantidade } = req.body;
    const query = 'INSERT INTO produtos (nome, preco, descricao, quantidade) VALUES (?, ?, ?, ?)';
    db.run(query, [nome, preco, descricao, quantidade], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, nome, preco, descricao, quantidade });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { nome, preco, descricao, quantidade } = req.body;
    const query = 'UPDATE produtos SET nome = ?, preco = ?, descricao = ?, quantidade = ? WHERE id = ?';
    db.run(query, [nome, preco, descricao, quantidade, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json({ id, nome, preco, descricao, quantidade });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM produtos WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json({ message: 'Produto deletado com sucesso' });
    });
}; 
