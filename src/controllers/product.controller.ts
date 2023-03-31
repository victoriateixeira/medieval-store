import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public getAllProducts = async (_req: Request, res: Response) => {
    const allProducts = await this.productService.getAllProducts();
    return res.status(200).json(allProducts);
  };

  public createProduct = async (req: Request, res: Response) => {
    const product = req.body;
    const productCreated = await this.productService.createProduct(product);
    return res.status(201).json(productCreated);
  };
}

export default ProductController;