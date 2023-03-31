import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAllProducts(): Promise <IProduct[]> {
    const [result] = await this.connection.execute(
      'SELECT * FROM Trybesmith.products',
    );
    return result as IProduct[];
  }

  public async createProduct(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.products (name, amount) 
      VALUES (?,?)`, 
      [name, amount],
    );
    return { id: insertId, ...product };
  }
}