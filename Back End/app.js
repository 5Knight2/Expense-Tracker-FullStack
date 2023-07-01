const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');


const user_route=require('./router/user');
const sequelize=require('./util/database');
const Expense=require('./model/expense');
const User=require('./model/user');

const app=express();
app.use(bodyparser.json());
app.use(cors())


app.use(user_route);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
//.sync({force:true})
.sync()
.then((res)=>{
    console.log('connected');
    app.listen(5000)})
.catch((err)=>{console.log(err)})
