const UsuariosServices = require('../services/UsuariosServices');


const getUsuarios = (req, res) => {
   UsuariosServices.getUsuarioss(req, res)
}

const createUsuarios = (req, res) => {
   UsuariosServices.createUsuarios(req, res)
}

const loginUsuarios = (req, res) => {
    UsuariosServices.login(req, res)
}
module.exports = {
    getUsuarios,
    createUsuarios,
    loginUsuarios
}