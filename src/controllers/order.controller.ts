import { Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAllOrders = async (_req: Request, res:Response) => {
    const allOrders = await this.orderService.getAllOrders();
    return res.status(200).json(allOrders);
  };
}

export default OrderController;