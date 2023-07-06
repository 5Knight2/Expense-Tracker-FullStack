const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');


const user_route=require('./router/user');
const expense_route=require('./router/expense');
const order_route=require('./router/order');
const premium_route=require('./router/premium');
const password_route=require('./router/password');

const sequelize=require('./util/database');
const Expense=require('./model/expense');
const User=require('./model/user');
const Order=require('./model/order');
const Reset=require('./model/reset');
const File_Url=require('./model/file_url');


const app=express();
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(cors())


app.use(user_route);
app.use(expense_route)
app.use(order_route);
app.use(premium_route);
app.use(password_route);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Reset);
Reset.belongsTo(User);

User.hasMany(File_Url);
File_Url.belongsTo(User);

sequelize
//.sync({force:true})
.sync()
.then((res)=>{
    console.log('connected');
    app.listen(5000)})
.catch((err)=>{console.log(err)})
