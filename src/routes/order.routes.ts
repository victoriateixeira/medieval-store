import { Router } from 'express';

import OrderController from '../controllers/order.controller';
import verifiesOrderData from '../middlewares/verifiesOrderData';
import validateToken from '../middlewares/verifiesToken';

const router = Router();
const orderController = new OrderController();

router.get('/', orderController.getAllOrders);
router.post('/', validateToken, verifiesOrderData, orderController.createOrder);

export default router;