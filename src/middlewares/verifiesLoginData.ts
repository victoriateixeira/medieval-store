import { Response, Request, NextFunction } from 'express';

const verifiesLoginData = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!password) { return res.status(400).json({ message: '"password" is required' }); }
  if (!username) { return res.status(400).json({ message: '"username" is required' }); }
  return next();
};

export default verifiesLoginData;