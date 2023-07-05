const express=require('express');
const password_Controller=require('../controller/password')


const router=express.Router();

router.post('/password/forgotpassword',password_Controller.reset);

module.exports=router;