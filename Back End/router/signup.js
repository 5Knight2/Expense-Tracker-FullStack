const express=require('express');
const signup_Controller=require('../controller/signup')

const router=express.Router();

router.post('/user/signup',signup_Controller.signup);

module.exports=router;