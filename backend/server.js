const express=require('express');
const connect=require('./connection/connection')
const app=express();
const PORT= process.env.PORT || 4000;
const cors=require('cors');
require('dotenv').config({path:"./config.env"})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
connect();



const productRoute=require('./routes/productRoute');
const CartRoute=require('./routes/CartRoute');


app.use('/api/product',productRoute);
app.use('/api/cart',CartRoute);


app.listen(PORT,()=>{console.log(`the server is active at port ${PORT}`)});