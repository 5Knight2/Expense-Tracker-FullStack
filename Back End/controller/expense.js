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
   .then((result)=>{
    req.user.totalCost=Number(req.user.totalCost)+Number(result.amount)
    req.user.save()
    .then((ret)=>{res.json(result.id)})
    .catch((err)=>{console.log(err)})
    }) 
   .catch((err)=>{console.log(err)})
}

exports.delete=(req,res,next)=>{
    const id=req.params.id
    req.user.getExpenses({where:{id:id}})
    .then((object)=>{

        req.user.totalCost=Number(req.user.totalCost)-Number(object[0].amount);
        req.user.save().then(()=> {
            if(object[0]){
                object[0].destroy()
                .then(()=> {return res.end()})
            .catch(err=>{console.log(err)})}
        })
        .catch(err=>{console.log(err)})

        
    })
    

    .catch(err=>{console.log(err)})

}