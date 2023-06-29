const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');

const signup_Router=require('./router/signup');
const sequelize=require('./util/database');

const app=express();
app.use(bodyparser.json());
app.use(cors())


app.use(signup_Router);

sequelize
.sync({force:true})
//.sync()
.then((res)=>{
    console.log(res);
    app.listen(5000)})
.catch((err)=>{console.log(err)})
