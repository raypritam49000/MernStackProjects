const express = require("express");
const route = express.Router();
const UserController = require("../controllers/UserController");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyToken } = require("../middlewars/verifyToken");

route.put("/:id", verifyTokenAndAuthorization, UserController.updateUser);
route.delete("/:id", verifyTokenAndAdmin, UserController.deleteUser);
route.post("/search", verifyTokenAndAdmin, UserController.getAllUsersWithPagination);
route.get("/findAll", verifyTokenAndAdmin, UserController.getAllUsers);
route.get("/projections/users",UserController.getAllUsersWithProjection);
route.get("/stats", verifyTokenAndAdmin, UserController.userStats);
route.get("/users",verifyToken,UserController.getAllUsersWithDistinctCount);
route.get("/aggregations/users",verifyToken,UserController.getAllUsersWithAggreation);
route.get("/current-user",verifyToken,UserController.getCurrentUser);


module.exports = route;