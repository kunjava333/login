// ADMIN LOGIN PAGE


const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const loadHome = async (req, res)=>{
  try {
    res.render('adminHome');
    
  } catch (error) {
    console.log(error.message);
  }
  
};
const adminLog = async (req, res) => {
  try {
    console.log("working");
    res.render("adminLogin");
  } catch (err) {
    console.log(err.message);
  }
};





// ADMIN AUTHENTICATION
const authAdmin = async (req, res) => {
  console.log("things are geting here");
  const logEmail = await req.body.adminEmail;
  const logPass = await req.body.adminPassword;

  const dbData = await User.findOne({email: logEmail});

  const realPass = await bcrypt.compare(logPass, dbData.password);

  if (!dbData) {
    
    res.render("adminLogin", { message: "Wrong email" });
  } else {
    if (realPass !== true) {
      console.log("or here");
      res.render("adminLogin", { message: "Incorrect password" });
    } else if (logEmail == dbData.email && realPass == true) {
      if (dbData.is_admin == 1) {
        req.session.user_id = dbData._id;
        console.log("here");
        res.render("adminHome");
      } else {
        res.render("adminLogin", { message: "Not admin" });
      }
    }
  }
};

const showUser = async (req,res)=>{
  
  const id = req.query.id;
  const userData = await User.findOne({_id:id})
  console.log(userData);
  res.render('updateUser',{users:userData});

}

const editUser = async (req,res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;

  User.updateOne({email:email},{name:name,email:email,mobile:number})
 

  res.redirect('/dashboard')

}

// ADMIN DASHBOARD

const dashboard = async (req, res) => {
  const dbData = await User.find({is_admin:0});
  try {
    if (req.session.user_id) {
      res.render("dashboard", {users: dbData});
    }else {
      res.redirect('/admin')
    }
  } catch (err) {
    console.log(err.message);
  }
};


const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (err) {
    console.log(err);
  }
};

const adminInsert = async (req,res)=>{
  try {
    const securedPassword = await securePassword(req.body.password);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: securedPassword,
      is_admin: 0,
    })

    const userData = await user.save();

    if(userData){
      res.render('dashboard',{message:"The new user has been saved"})
    }else{
      res.render('dashboard',{message:'there a problem try again '})
    }

  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  adminLog,
  authAdmin,
  dashboard,
  adminInsert,
  loadHome,
  showUser,
  editUser,
};
