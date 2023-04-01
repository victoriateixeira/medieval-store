import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public createUser = async (req: Request, res: Response) => {
    const userData = req.body;
    const token = await this.userService.createUser(userData);
    res.status(201).json({ token });
  };
}

export default UserController;