import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ILogin, IUser } from '../interfaces';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async createUser(userData: IUser): Promise<IUser> {
    const { username, vocation, level, password } = userData;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.users (username, vocation, level, password) 
      VALUES (?,?,?,?)`, 
      [username, vocation, level, password],
    );
    return { id: insertId, ...userData };
  }

  public async login(loginData: ILogin): Promise<IUser> {
    const { email } = loginData;
    const [rows] = await this.connection.execute<RowDataPacket[] & IUser>(
      'SELECT* FROM users WHERE email =?', 
      [email],
    ); 
    return rows;
  }
}