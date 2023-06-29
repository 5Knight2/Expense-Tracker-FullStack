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