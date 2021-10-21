const express = require("express");
const route = express.Router();
const Controller = require("../controllers/controller");

route.get('/', Controller.listPosts)

module.exports = route