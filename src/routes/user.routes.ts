import { Router } from 'express';
import verifiesUserData from '../middlewares/verifiesUserData';
import UserController from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post(
  '/', 
  verifiesUserData.checkRequiredFields,
  verifiesUserData.checkTypeOf,
  verifiesUserData.checkLength, 
  userController.createUser,
);

export default router;