const User=require('../model/user')
const bcrypt=require('bcrypt')

exports.signup=(req,res,next)=>{
    obj=req.body;   
    
    bcrypt.hash(obj.password,10,(err,hash)=>{
        
        User.create({name:obj.fullname,email:obj.email,password:hash})
        .then(()=>{res.status(201).end()}) 
        .catch((err)=>{console.log(err)
        if(err.name=='SequelizeUniqueConstraintError' && err.fields.email== obj.email){
         res.status(403).send("Email already registered");
 
        }else res.end(err);
 })
    })
   

    
}

exports.login=(req,res,next)=>{
    User.findOne({
        
        where: {
            email:req.body.email,
        },
    })
    .then(result=>{
        if(result===null)return res.status(404).send('User not found')
        bcrypt.compare(req.body.password,result.password,(err,result)=>{

            if(result)  return res.send('User login sucessful')
            else  return res.status(401).send('User not authorized')
        })
    })
    .catch(err=>{console.log(err)
    return res.end();})
}