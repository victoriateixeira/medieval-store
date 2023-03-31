import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../interfaces';

const secret = process.env.JWT_SECRET || 'SecretFiller';

const JWT_CONFIG: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

export const createToken = (data: IUser) => jwt.sign(data, secret, JWT_CONFIG);

// const verifyToken = (token) => jwt.verify(token, secret);

export const verifyToken = (authorization :string) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (error) {
    throw new Error();
  }
};
