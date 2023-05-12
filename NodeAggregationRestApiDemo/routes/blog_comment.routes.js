const express = require("express");
const route = express.Router();
const BlogCommentController = require("../controllers/BlogCommentController");
const { verifyToken } = require("../middlewars/verifyToken");

route.post("/createBlogComment", verifyToken, BlogCommentController.createBlogComment);
route.get("/comments/:blog_id", verifyToken, BlogCommentController.getComments);
route.put("/updateBlogComment/:comment_id", verifyToken, BlogCommentController.updateBlog);
route.delete("/deleteBlogComment/:comment_id", verifyToken, BlogCommentController.deleteBlog);



module.exports = route;