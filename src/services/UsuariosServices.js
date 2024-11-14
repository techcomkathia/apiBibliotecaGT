const Usuarios = require('../models/UsuariosModel');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verificarToken = require('../middleware/authMiddleware');


app.use(express.json());

const getUsuarios = (req, res) => {
    //varias linhas de validação de dados e regras
    //usar middleware para atenticar
    //delegar persistencia para camada de acesso a dados
    Usuarios.findAll()
    .then(Usuarios => {
        res.json({statusCode: 200, 
            dados: Usuarios});
    })
    .catch(erro => {
res.status(500).json({ message: 'Erro ao buscar Usuarios', erro });    })
}

const createUsuario = async (req, res) => {
    const { primeiroNome, sobreNome, email, senha } = req.body;
    const saltRounds = 10;

    try {
        // Verificar se o e-mail já existe
        const UsuarioExistente = await Usuario.findOne({ where: { email: email } });
        if (UsuarioExistente) {
            return res.status(400).json({
                message: 'E-mail já cadastrado'
            });
        }

        // Criptografar a senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        // Criar um novo Usuario
        const novoUsuario = await Usuario.create({
            primeiroNome: primeiroNome,
            sobreNome: sobreNome,
            email: email,
            senha: senhaCriptografada
        });

        res.json({
            message: 'Usuario criado com sucesso',
            Usuario: novoUsuario
        });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({
            message: 'Erro ao criar Usuario'
        });
    }
};



const login = async(req, res) => {
    try {
    const { email, senha } = req.body;
    // console.log('Email fornecido:', email);
    // console.log('Senha fornecida:', senha);
    const Usuario = await Usuario.findOne({ where: { email: email },  attributes: ['id', 'primeiroNome', 'sobreNome', 'email', 'senha'] })
    // console.log('Usuario encontrado:', Usuario);
    // console.log('Usuario encontrado:', Usuario.dataValues);

    if (!Usuario) {
        return res.status(401).json({ message: 'Email inválido' })
    }

    //caso o email esteja correto verificar a senha
    //bycrypt.compare retorna true ou false
    const senhaCorreta = await bcrypt.compare(senha, Usuario.dataValues.senha)

    // caso senhaCorreta seja falso
    if (!senhaCorreta) {
        return res.status(401).json({ message: 'senha inválida' })
    }

    //caso senha correta gerar o token
    const token = jwt.sign({ id: Usuario.dataValues.id, email: Usuario.dataValues.email }, 'your-secret-key', { expiresIn: '1h' })
    res.status(200).json(
        {
            message: 'Login realizado com sucesso', 
            token: token 
        })  
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login' })
    }
}


module.exports = {
    getUsuarios,
    createUsuario,
    login
}