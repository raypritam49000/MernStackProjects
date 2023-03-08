import { Router } from 'express';
import UserController from '../controllers/UserController';
const router: Router = Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
// router.put('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);

export default router;