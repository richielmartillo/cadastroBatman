const express = require('express');
const cors = require('cors');

const app = express(); // <-- Isso tem que vir antes do app.use()

const produtosRoutes = require('./routes/produtos');

app.use(cors());
app.use(express.json());
app.use('/produtos', produtosRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
}); 
