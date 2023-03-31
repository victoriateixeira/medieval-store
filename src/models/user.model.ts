import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IUser } from '../interfaces';

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
}