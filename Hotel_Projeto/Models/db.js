const Sequelize = require('sequelize')
const sequelize = new Sequelize('hotel','root', '12345',{
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log("Conectado Com Sucesso")
}).catch(function(erro){
    console.log("Falha Ao Se Conectar: "+erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}