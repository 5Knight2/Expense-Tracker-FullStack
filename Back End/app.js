const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');

const user_route=require('./router/user');
const sequelize=require('./util/database');

const app=express();
app.use(bodyparser.json());
app.use(cors())


app.use(user_route);

sequelize
//.sync({force:true})
.sync()
.then((res)=>{
    console.log(res);
    app.listen(5000)})
.catch((err)=>{console.log(err)})
