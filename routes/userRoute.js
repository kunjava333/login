//THIS IS WHERE ALL THE MODULE GOES

const express = require('express');

const user_route = express();

const session = require('express-session')
const config = require('../config/config')
user_route.use(session({
    secret:config.sessionSecret,resave:false,saveUninitialized:true

}));
const auth = require('../midleware/auth')
user_route.set('view engine','ejs');
user_route.set('views','./views/users')
user_route.use(express.json())
user_route.use(express.urlencoded({extended:true}))

const userController = require('../controlller/userControler');



// Register Route
user_route.get('/register',auth.isLogout,userController.loadRegister);

user_route.post('/register',userController.insertUser);

user_route.get('/',auth.isLogout,userController.loginLoad);

user_route.post('/login',userController.authUser);

user_route.get('/home',auth.isLogin,userController.loadHome);


user_route.get('/logout',userController.logOut)

module.exports = user_route;
