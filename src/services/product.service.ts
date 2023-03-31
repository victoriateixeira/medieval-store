import connection from '../models/connection';
import ProductModel from '../models/product.model';
import { IProduct } from '../interfaces';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async createProduct(product: IProduct): Promise<IProduct> {
    return this.model.createProduct(product);
  }
}

export default ProductService;