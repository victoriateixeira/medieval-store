import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { IOrder } from '../interfaces';
import ProductModel from '../models/product.model';

class OrderService {
  public model: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAllOrders(): Promise<IOrder[]> {
    const allOrders = await this.model.getAllOrders();
    return allOrders;
  }

  public async createOrder(userId: number, prodIds: number[]): Promise<IOrder> {
    const idOrder = await this.model.createOrder(userId);
    await Promise.all(prodIds.map((prId) => this.productModel.addOrderToProduct(idOrder, prId)));
    return { userId, productsIds: prodIds };
  }
}

export default OrderService;