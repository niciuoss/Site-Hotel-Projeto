const db = require('./db')

const Post = db.sequelize.define('registros',{
    nome: {
        type: db.Sequelize.STRING
    },
    sobrenome: {
        type: db.Sequelize.STRING
    },
    tipo_de_pagamento: {
        type: db.Sequelize.STRING
    },
    tipo_de_quarto:{
        type: db.Sequelize.STRING
    },
    quantidade_de_dias: {
        type: db.Sequelize.INTEGER
    },
    quantidade_de_pessoas:{
        type: db.Sequelize.INTEGER
    },
    cpf:{
        type: db.Sequelize.INTEGER
    }
})

module.exports = Post
//Post.sync({force: true}) //Essa Linha é pra executar só uma vez....