const User=require('../model/user')
const Expense=require('../model/expense')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.signup=async(req,res,next)=>{
    obj=req.body;   
  
    bcrypt.hash(obj.password,10,async(err,hash)=>{
        
        try{
        const result= await User.create({name:obj.fullname,email:obj.email,password:hash})
        res.status(201).end()}
        catch(err){console.log(err)
        if(err.name=='SequelizeUniqueConstraintError' && err.fields.email== obj.email){
         res.status(403).send("Email already registered");
 
        }else res.end(err);
 }
})}

exports.login=(req,res,next)=>{
    User.findOne({
        
        where: {
            email:req.body.email,
        },
    })
    .then(result=>{
        if(result===null)return res.status(404).send('User not found')
        bcrypt.compare(req.body.password,result.password,(err,same)=>{

            if(same)  return res.send({message:'User login sucessful',token:encrypt(result.id)})
            else  return res.status(401).send('User not authorized')
        })
    })
    .catch(err=>{console.log(err)
    return res.end();})
}

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

function encrypt(id){
    
    return jwt.sign({userid:id},'secretKey');
}