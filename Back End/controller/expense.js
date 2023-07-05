const User=require('../model/user')
const Expense=require('../model/expense')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const sequelize=require('../util/database')

exports.get_All_Expenses=(req,res,next)=>{
    req.user.getExpenses()
    .then(result=>{return res.send(result)})
    .catch(err=>{console.log(err)})
   
}

exports.post_Expense = async (req, res, next) => {
    
    try {
        const t=await sequelize.transaction();

        const result = await req.user.createExpense({
        description: req.body.description,
        type: req.body.type,
        amount: req.body.amount
      },{transaction:t});
  
      req.user.totalCost = Number(req.user.totalCost) + Number(result.amount);
      await req.user.save({transaction:t});
      await t.commit();
      return res.json(result.id);
    } catch (err) {
      await t.rollback();
      return res.end();
      console.log(err);
    }
  };

exports.delete=async (req,res,next)=>{
    const id=req.params.id
    const t=await sequelize.transaction();
    try{
   
    const object=await req.user.getExpenses({where:{id:id},transaction:t})
    
        req.user.totalCost=Number(req.user.totalCost)-Number(object[0].amount);
        await req.user.save()
            if(object[0]){
                await object[0].destroy()
                await t.commit();
                return res.end()}
            }
        
    catch(err){await t.rollback()
            console.log(err)}

        
    }
    



