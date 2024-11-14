const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');
const verificarToken = require('../middleware/authMiddleware');

//rota protegida
//path, middleware de autenticação, controlador
router.post('/', verificarToken, UsuariosController.getUsuarios);

//rota publica
//path, controlador
router.get('/', verificarToken, UsuariosController.getUsuarios);
router.post('/login/', UsuariosController.loginUsuarios);
module.exports = router