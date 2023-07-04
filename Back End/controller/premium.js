const User=require('../model/user')
const Expense=require('../model/expense')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Sequelize  = require('sequelize')
const sequelize=require('../util/database')

exports.get_All_Expenses=async (req,res,next)=>{
    try{
        const result=await Expense.findAll({
            attributes:[[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_cost']],
            include:[{
                model:User,
                attributes:['name']
            }],
            group:['userId'],
            order:[['total_cost','DESC']]
        })
            
    

        
        return res.send(result)}
    catch(err){console.log(err)}
   
}
