const isLogin = async (req, res, next) => {
    try {
      if (req.session.user_id) {
        next(); // User is logged in, proceed to next middleware or route
      } else {
        res.redirect('/'); // User is not logged in, redirect to login page
      }
    } catch (error) { 
      console.log(error.message);
    }
  };
  
  const isLogout = async (req, res, next) => {
    try {
      if (req.session.user_id) {
        res.redirect('/home'); // User is logged in, redirect to home page
      } else {
        next(); // User is not logged in, proceed to next middleware or route
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  module.exports = {
    isLogin,
    isLogout
  };
  