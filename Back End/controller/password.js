const User=require('../model/user')
const  Sib=require('sib-api-v3-sdk');

exports.reset=async(req,res,next)=>{
    try{
    const defaultClient=Sib.ApiClient.instance;
    const apiKey=defaultClient.authentications['api-key']
    apiKey.apiKey='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'

    const tranEmailApi=new Sib.TransactionalEmailsApi();
    const sender={email:'pratiktarale100@gmail.com'}
    const receiver=[{email:req.body.email}]

    await tranEmailApi.sendTransacEmail({sender,to:receiver,subject:'demo',textContent:'Hiiii'})
    res.json({message:'email sent'});
    console.log('done')
    }
    catch(err){console.log(err)}

}