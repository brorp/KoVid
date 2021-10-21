const express = require("express");
const route = express.Router();
const Controller = require("../controllers/controller")
const routeProfile = require("./profile")
const routePost = require("./post")
const dataLogin = require("../middlewares/dataLogin");

route.get("/login", Controller.loginForm); 
route.post("/login", Controller.loginPost); 
route.get("/logout", Controller.logOut);

route.get("/register", Controller.registerUserForm);  
route.post("/register", Controller.registerUserPost);  

route.use(dataLogin);

route.get("/", Controller.home); 
route.use('/posts', routePost)
route.use("/profiles", routeProfile)

module.exports = route;