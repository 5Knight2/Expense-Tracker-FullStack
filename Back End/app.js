const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');


const user_route=require('./router/user');
const expense_route=require('./router/expense');
const order_route=require('./router/order');
const premium_route=require('./router/premium');


const sequelize=require('./util/database');
const Expense=require('./model/expense');
const User=require('./model/user');
const Order=require('./model/order');


const app=express();
app.use(bodyparser.json());
app.use(cors())


app.use(user_route);
app.use(expense_route)
app.use(order_route);
app.use(premium_route);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
//.sync({force:true})
.sync()
.then((res)=>{
    console.log('connected');
    app.listen(5000)})
.catch((err)=>{console.log(err)})
