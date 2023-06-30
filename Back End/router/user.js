const express=require('express');
const signup_Controller=require('../controller/user')

const router=express.Router();

router.post('/user/signup',signup_Controller.signup);

router.post('/user/login',signup_Controller.login);

router.get('/expense',signup_Controller.get_All_Expense);

router.post('/expense',signup_Controller.post_Expense);

router.get('/delete/:id',signup_Controller.delete);
module.exports=router;