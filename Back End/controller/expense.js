const User=require('../model/user')
const Expense=require('../model/expense')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const sequelize=require('../util/database')
const aws=require('aws-sdk')
const { UpdateAttribute } = require('sib-api-v3-sdk')

exports.download=async(req,res,next)=>{
    try{
        let expense=await req.user.getExpenses()
        expense=JSON.stringify(expense);
 
        const FILE_NAME='expense_for_'+req.user.email+new Date()+'.txt';

        const URL= await update(expense,FILE_NAME);
        res.status(200).json({file_Url:URL})


    }
    catch(err){console.log(err)
    res.status(500).json({err:err})}

}

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
    

async function update(data,FILE_NAME){
    const KEY='AKIAXP4MX7CZL6TEZPFT';
    const SECRET='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';
    const BUCKET_NAME='expensetracker1221'

    let S3Bucket=new aws.S3({
        accessKeyId:KEY,
        secretAccessKey:SECRET,
        Bucket:BUCKET_NAME
    })

    var params={
        Bucket:BUCKET_NAME,
        Key:FILE_NAME,
        Body:data,
        ACL:'public-read'
    }

    return new Promise((resolve, reject)=>{
     S3Bucket.upload(params,(err,response)=>{
        
        if(err){
         reject(err)}
        else{
             resolve(response.Location);
        }})
    })
    

} 

