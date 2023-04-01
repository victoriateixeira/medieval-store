import { Router } from 'express';

import UserController from '../controllers/user.controller';
import verifiesLoginData from '../middlewares/verifiesLoginData';

const router = Router();
const userController = new UserController();

router.post('/', verifiesLoginData, userController.loginUser);

export default router;