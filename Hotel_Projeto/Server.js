
const hostname = 'localhost'
const port = 9999
const rota = "/Home"

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Post = require('./Models/Post')
const path = require('path')
const handlebars = require('express-handlebars')
const {sequelize} = require('./Models/db')

//Config
//Template Engine
app.engine("handlebars", handlebars({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars')

//Puclic 
app.use(express.static(path.join(__dirname, "public")))

//Configurar o Body-Parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
//Abrir um aquivo html 
//==============================|Metodos Gets|==============================
app.get("/Home", function (req, res) {
    //res.sendFile(__dirname+"/paginas/Home.html")
    res.render('Home')
})
app.get("/Quartos", function (req, res) {
    //res.sendFile(__dirname+"/paginas/Quartos.html")
    res.render('Quartos')
})
app.get("/Registro", function (req, res) {
    //res.sendFile(__dirname+"/paginas/Registro.html")
    res.render('Registro')
})
app.get("/RegistrosDoHotel", function (req, res) {
    Post.findAll().then(function (posts) {
        res.render('RegistrosDoHotel', {
            posts: posts
        })
    })
    //res.sendFile(__dirname+"/paginas/MeuPerfil.html")
})
//==============================|Metodos Gets|==============================

//==============================|Metodos Post|==============================
app.post('/add', function (req, res) {

    //Adicionando do Banco De Dados

    Post.create({

        nome: req.body.fname,
        sobrenome: req.body.sname,
        tipo_de_pagamento: req.body.opcao,
        tipo_de_quarto: req.body.Escolha,
        quantidade_de_dias: req.body.qtdDias,
        quantidade_de_pessoas: req.body.qrdPessoas,
        cpf: req.body.User_CPF,

    }).then(function () {
        res.render('Confirmacao')
    }).catch(function (erro) {
        res.render('Erro')
    })
})
//==============================|Deletar|==============================
app.get('/deletar', function (req, res) {
    res.render('deletar')
})

app.post('/del', function(req,res){
    sequelize.query("DELETE FROM registros WHERE cpf = "+req.body.User_CPF)
    res.render('Confirmacao')
})

app.get('/update', function (req, res) {
    //Atualizar Banco De Dados
    res.render('update')
})
app.post('/up', function (req, res) {

    sequelize.query("UPDATE registros SET nome = '"+req.body.fname + "' ,"+
    " sobrenome = '" + req.body.sname + "' ,"+
    " tipo_de_pagamento = '" + req.body.opcao + "' ,"+
    " tipo_de_quarto = '" + req.body.Escolha + "' ,"+
    " quantidade_de_dias = " + req.body.qtdDias + " ," +
    " quantidade_de_pessoas = " + req.body.qrdPessoas +
      
    " WHERE cpf = "+ req.body.User_CPF)
    res.render('Confirmacao')
      
})
//==============================|Metodos Post|==============================
app.listen(port,hostname,rota, () => {
    console.log("Back-End Executando")
    console.log("Server Rodando Em http://"+hostname+":"+port+rota)
})
