const express = require("express");
const route = express.Router();
const BlogController = require("../controllers/BlogController");
const { verifyToken } = require("../middlewars/verifyToken");

route.post("/createBlog", verifyToken, BlogController.createBlog);
route.get("/search", verifyToken, BlogController.searchBlog);
route.get("/searchBlog", verifyToken, BlogController.searchBlogWithAggregation);
route.get("/findBlogById/:blog_id", verifyToken, BlogController.getBlogById);
route.put("/:blog_id/update", verifyToken, BlogController.updateBlog);
route.delete("/:blog_id/delete", verifyToken, BlogController.deleteBlog);
route.post("/:blog_id/toggle_like", verifyToken, BlogController.toggle_like);


module.exports = route;