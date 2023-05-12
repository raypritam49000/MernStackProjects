import express from 'express';
import AuthController from '../controllers/AuthController.js';
import isAuthenticatedUser from '../middlewares/AuthenticatedUser.js';
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login",AuthController.login);
router.post("/logout",isAuthenticatedUser,AuthController.logout);

export default router;