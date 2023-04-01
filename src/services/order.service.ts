import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { IOrder } from '../interfaces';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAllOrders(): Promise<IOrder[]> {
    const allOrders = await this.model.getAllOrders();
    return allOrders;
  }
}

export default OrderService;