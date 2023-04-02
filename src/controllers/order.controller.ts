import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/user.model';
import OrderService from '../services/order.service';
import connection from '../models/connection';
import { verifyToken } from '../auth/authFunctions';

class OrderController {
  private orderService: OrderService;

  public userModel: UserModel;

  constructor() {
    this.orderService = new OrderService();
    this.userModel = new UserModel(connection);
  }

  public getAllOrders = async (_req: Request, res:Response) => {
    const allOrders = await this.orderService.getAllOrders();
    return res.status(200).json(allOrders);
  };

  public createOrder = async (req: Request, res:Response) => {
    const { productsIds } = req.body;
    const { authorization } = req.headers;
    
    const isValid = verifyToken(authorization as string) as JwtPayload;
    const [user] = await this.userModel.getUser(isValid.data);
    const { id } = user;
    const newOrder = await this.orderService.createOrder(id as number, productsIds);
    return res.status(201).json(newOrder);
  };
}

export default OrderController;