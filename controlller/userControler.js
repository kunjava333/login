const User = require("../models/userModel");
const path = require("path");
const bcrypt = require("bcrypt");

// const nodeMailer = require("nodemailer");
// const { info } = require("console");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (err) {
    console.log(err);
  }
};


const loadRegister = async (req, res) => {
  try {
    res.render("registration");
  } catch (err) {
    console.log(err.message);
  }
};

const insertUser = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const user = new User({
      name: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      // image:req.file.filename
      password: spassword,
      is_admin: 0,
    });

    const userData = await user.save();

    if (userData) {
      //   sendVerifyMail(req.body.name, req.body.email, userData._id);
      res.render("registration", {
        message: "You are registered, please verify your mail",
      });
    } else {
      res.render("registration", {
        message: "You are not registered there are some problem",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const loginLoad = async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err.message);
  }
};

const authUser = async(req,res)=>{
  const logEmail = req.body.email;
  const logPass = req.body.password;

  const dbData = await User.findOne({email:logEmail});

  const realPass = await bcrypt.compare(logPass, dbData.password);

  if(!dbData){
    console.log('here');
    res.render('login',{message:'Wrong email'});
  }else{
    if(!realPass){
      console.log('or here');
      res.render('login',{message:'Incorrect password'})
    }else if(logEmail == dbData.email && realPass == true) {
      if(dbData.is_admin == 1){
        req.session.user_id = dbData._id;
        res.render('adminHome')
      }else{
        req.session.user_id = dbData._id;
        res.render('home')
      }
      
    }
  }

}

const loadHome = async(req,res)=>{
  try {
     console.log("working");
    res.render('home')

  } catch (error) {
      console.log(error.message);
  }
}

// // const verifyMail = async(req,res)=>{
// //     try {
// //        const updateInfo = await User.updateOne({_id:req.query.id},{is_verified:1})
// //        console.log(updateInfo);
// //        res.render('email-verify')
// //        console.log("Its running");
// //     } catch (err) {
// //         console.log(err.message);
// //     }
// // }

// // const endSession = async(req,res)=>{
// //   req.session.destroy(err => {
// //       if (err) {
// //         console.error('Error destroying session:', err);
// //         res.status(500).send('Error logging out');
// //       } else {
// //         // Redirect the user to the login page or any other page
// //         res.redirect('/');
// //       }
// // }
// // )}

// console.log(10);
const logOut = async(req,res)=>{
   req.session.destroy((err)=>{
    if(err){
      console.log(err.message);

    }else{
      res.redirect('/');
    }
   })
  }


module.exports = {
  loadRegister,
  insertUser,
  loginLoad,
  authUser,
  loadHome,
  logOut,
};
