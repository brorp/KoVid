const express = require("express");
const route = express.Router();
const Controller = require("../controllers/controller");

route.get('/edit', Controller.editProfileForm)
route.post('/edit', Controller.editProfilePost)

module.exports = route