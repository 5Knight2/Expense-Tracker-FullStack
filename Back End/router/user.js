const express=require('express');
const signup_Controller=require('../controller/user')
const authentication_middleware=require('../middleware/auth')

const router=express.Router();

router.post('/user/signup',signup_Controller.signup);

router.post('/user/login',signup_Controller.login);

router.get('/expense',authentication_middleware.authenticate,signup_Controller.get_All_Expenses);

router.post('/expense',authentication_middleware.authenticate,signup_Controller.post_Expense);

router.get('/delete/:id',authentication_middleware.authenticate,signup_Controller.delete);
module.exports=router;