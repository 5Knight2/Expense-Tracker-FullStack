const express=require('express');
const signup_Controller=require('../controller/user')
const authentication_middleware=require('../middleware/auth')

const router=express.Router();

router.post('/user/signup',signup_Controller.signup);

router.post('/user/login',signup_Controller.login);

module.exports=router;