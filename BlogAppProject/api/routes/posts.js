import express from 'express';
import PostController from '../controllers/PostController.js';
import isAuthenticatedUser from "../middlewares/AuthenticatedUser.js"
const router = express.Router();

router.get("/", PostController.getPosts);
router.get("/:id",PostController.getPost);
router.post("/", isAuthenticatedUser, PostController.addPost);
router.delete("/:id",isAuthenticatedUser, PostController.deletePost);
router.put("/:id", isAuthenticatedUser,PostController.updatePost);

export default router;