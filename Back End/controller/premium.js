const User=require('../model/user')
const Expense=require('../model/expense')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.get_All_Expenses=async (req,res,next)=>{
    try{const result=await Expense.findAll()
    
        const map=new Map();

        for(let i=0;i<result.length;i++){

            if(map.has(result[i].userId)){
                map.set(result[i].userId,map.get(result[i].userId)+result[i].amount)
            }else(map.set(result[i].userId,result[i].amount))
   
        } const array = Array.from(map, ([id, total]) => ({ id, total }));
        array.sort((a, b) => {
            return a.total - b.total;
        });
        const users=await User.findAll()
        const usermap=new Map();
        for(let i=0;i<users.length;i++){
            (usermap.set(users[i].id,users[i].name))
        } 
        for(let i=0;i<array.length;i++){
            array[i].id=usermap.get(array[i].id);
        } 

        
        return res.send(array)}
    catch(err){console.log(err)}
   
}