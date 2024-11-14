const express = require('express');
const UsuariosRoutes = require('./routes/UsuariosRoutes');
const verificarToken = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo a api do GT ONLINE',
        version: '1.0.0',
        autor: 'Káthia Rocha'
    });
});

app.use('/users', UsuariosRoutes);

module.exports = app;