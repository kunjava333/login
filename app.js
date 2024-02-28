const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/user_manegement_system").then(()=>console.log('connected')).catch((err)=>console.log(err))


const express = require('express');
const app = express();
const cache = require('nocache')

const userRoute = require('./routes/userRoute')
app.use('/',userRoute)

const adminRoute = require('./routes/adminRoute')
app.use('/admin',adminRoute)  

app.listen(7000,()=>{ 
    console.log("the server has been started");
})



app.use(cache())