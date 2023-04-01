import jwt, { SignOptions } from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import { IUser } from '../interfaces';

const secret = process.env.JWT_SECRET || 'SecretFiller';

const JWT_CONFIG: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  static createToken = (data: IUser) => jwt.sign({ data }, secret, JWT_CONFIG);

  // const verifyToken = (token) => jwt.verify(token, secret);

  static verifyToken = (authorization :string) => {
    try {
      const payload = jwt.verify(authorization, secret);
      return payload;
    } catch (error) {
      throw new Error();
    }
  };

  public async createUser(userData: IUser): Promise<string> {
    const newUser = await this.model.createUser(userData);
    const { id, username, vocation, level } = newUser;
    const userWithoutPassword: IUser = { id, username, vocation, level };
    const token = UserService.createToken(userWithoutPassword);
    console.log(token, 'TOKEN');
    return token;
  }
}

export default UserService;