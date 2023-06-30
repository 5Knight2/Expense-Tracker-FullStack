const User=require('../model/user')

exports.signup=(req,res,next)=>{
    obj=req.body;   
    
    
    User.create({name:obj.fullname,email:obj.email,password:obj.password})
   .then(()=>{res.status(201).end()}) 
   .catch((err)=>{console.log(err)
    if(err.name=='SequelizeUniqueConstraintError' && err.fields.email== obj.email){
        res.status(403).send("Email already registered");

    }else res.end(err);
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
        if(req.body.password==result.password){
            return res.send('User login sucessful')
        }else{
            return res.status(401).send('User not authorized')
        }
    })
    .catch(err=>{console.log(err)
    return res.end();})
}