import { Response, Request, NextFunction } from 'express';

const verifiesLoginData = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email) { return res.status(400).json({ message: '"username" is required' }); }
  if (!password) { return res.status(400).json({ message: '"password" is required' }); }
  return next;
};

export default verifiesLoginData;