const Razorpay=require('razorpay')
const Order=require('../model/order');
const User=require('../model/user');

exports.buy=async (req,res,next)=>{

try{
    const rzp=new Razorpay({
        key_id:'rzp_test_wrJs6S503DFUOa',
        key_secret:"7VDErU1j0h8h5yjT0OyCsC4b"
    })
    const amount=2000000;
    rzp.orders.create({amount,currency:'INR'},(err,order)=>{
        if(err){console.log(err)
        throw new Error(JSON.stringify.err)}
        
        req.user.createOrder({
            orderId:order.id,
            paymentstatus:'PENDING'
        })
        .then(()=>{res.status(201).json({id:order.id,key_id:rzp.key_id})})
        .catch(err=>{
            console.log(err)
            throw new Error(err)
        })
    })

}
catch(err){res.status(403).json({message:'something went wrong',error:err})}

}

exports.changeStatus=async (req,res,next)=>{
    
    try{
    const curr_order=await Order.findOne({where:{orderId:req.body.order_id}})
    
        if(req.body.payment_id){
           await curr_order.update({paymentstatus:"SUCCESS",paymentId:req.body.payment_id});
            req.user.update({isPremiumUser:true});
            res.status(201).json({message:"You are now premium user"});
            
        }
        else{curr_order.update({paymentstatus:"Failed"});
        res.status(201).json({message:"Payment Failed"});
    }
    }
    catch(err){res.status(403).json({message:'something went wrong',error:err})}
}