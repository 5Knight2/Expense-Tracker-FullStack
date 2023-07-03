const User=require('../model/user')
const Expense=require('../model/expense')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.get_All_Expenses=(req,res,next)=>{
    req.user.getExpenses()
    .then(result=>{return res.send(result)})
    .catch(err=>{console.log(err)})
   
}

exports.post_Expense=(req,res,next)=>{
   req.user.createExpense({
    description:req.body.description,
    type:req.body.type,
    amount:req.body.amount
   })
   .then((result)=>{res.json(result.id)}) 
   .catch((err)=>{console.log(err)})
}

exports.delete=(req,res,next)=>{
    const id=req.params.id
    req.user.getExpenses({where:{id:id}})
    .then((object)=>{
        return req.user.removeExpense(object)
    })
    .then(()=> {return res.end()})
    .catch(err=>{console.log(err)})

    .catch(err=>{console.log(err)})

}