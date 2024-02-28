const express = require('express');
const admin_route = express();

const session = require('express-session')
const config = require('../config/config')
const auth = require('../midleware/adminAuth');
admin_route.use(session({
    secret:config.sessionSecret,resave:false,saveUninitialized:true

}));

admin_route.use(express.json());
admin_route.use(express.urlencoded({extended:true}))

admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');


  


const adminControler = require('../controlller/adminContrler');





admin_route.get('/',auth.isLogout,adminControler.adminLog);

admin_route.post('/adminlog',adminControler.authAdmin);


admin_route.get('/dashboard',auth.isLogin,adminControler.dashboard);

admin_route.post('/adminAdd',adminControler.adminInsert)

admin_route.get('/adminHome',auth.isLogin,adminControler.loadHome)

admin_route.post('/edit',auth.isLogin,adminControler.showUser)

admin_route.post('/edited',adminControler.editUser);

admin_route.get('*',(req,res)=>{
    res.redirect('/admin')
})


module.exports = admin_route;