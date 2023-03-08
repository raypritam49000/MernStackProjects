const express = require("express");
const route = express.Router();
const CategoryController = require("../controllers/CategoryController");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyToken } = require("../middlewars/verifyToken");

route.post("/createCategory", verifyToken ,CategoryController.createCategory);

module.exports = route;