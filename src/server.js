const app = require('./app');
const express = require('express');
app.use(express.json());

app.listen(5000, () => {
    console.log('Servidor iniciado na porta 5000');
});