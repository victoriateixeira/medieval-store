import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IOrder } from '../interfaces';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAllOrders(): Promise<IOrder[]> {
    const [result] = await this.connection.execute(
      `SELECT c.order_id AS id, c.user_id AS userId, JSON_ARRAYAGG(c.id) AS productsIds
 FROM (SELECT p.order_id, p.id, o.user_id
FROM Trybesmith.products as p
INNER JOIN Trybesmith.orders as o
ON p.order_id = o.id) AS c
GROUP BY c.order_id`,
    );
    console.log(result, 'ORDERS');
    return result as IOrder[];
  }

  public async createOrder(id: number): Promise<IOrder> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders (user_id) VALUES(?)',
      [id],
    );
    return { id: insertId, userId: id };
  }
}