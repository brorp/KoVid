function dataLogin(req, res, next) {
    if (req.session.sessionData) {
      res.locals.sessionData = req.session.sessionData
        next();
    } else {
        if(req.path === '/'){
        next()
      } else {
        res.redirect("/login")
      }
    }
  }
  
  
module.exports = dataLogin;
  