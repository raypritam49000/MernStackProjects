const express = require("express");
const route = express.Router();
const AuthController = require("../controllers/AuthController");

route.post("/login", AuthController.login);
route.post("/register", AuthController.register);

module.exports = route;