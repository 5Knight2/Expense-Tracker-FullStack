const Sequelize=require('sequelize');

const DB=new Sequelize('expense_tracker','root','Password@123',{
    dialect:'mysql', 
    host:'localhost'
})

module.exports=DB;