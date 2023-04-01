import connection from '../models/connection';
import ProductModel from '../models/product.model';
import { IProduct, IServiceReturn } from '../interfaces';

const productProperties = ['name', 'amount'];
class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  static validateProperties(product: IProduct): [boolean, string | null] {
    for (let i = 0; i < productProperties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(product, productProperties[i])) {
        return [false, productProperties[i]];
      }
    }
    return [true, null];
  }
  
  static validateValuesType(product: IProduct): [boolean, string | null] {
    const entries = Object.entries(product);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (typeof value !== 'string') {
        return [false, property];
      }
    }
    return [true, null];
  }

  static validateValuesLength(product: IProduct): [boolean, string | null] {
    const entries = Object.entries(product);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (value.length < 3) {
        return [false, property];
      }
    }
    return [true, null];
  }
  
  static validationProduct(product: IProduct): void | IServiceReturn {
    let [valid, property] = ProductService.validateProperties(product);
    if (!valid) {
      return { type: 400, message: { message: `"${property}" is required` } };
    }

    [valid, property] = ProductService.validateValuesType(product);
  
    if (!valid) {
      return { type: 422, message: { message: `"${property}" must be a string` } };
    }

    [valid, property] = ProductService.validateValuesLength(product);
  
    if (!valid) {
      return { type: 422,
        message: { message: `"${property}" length must be at least 3 characters long` } };
    }
  }
  
  public async getAllProducts():Promise<IProduct[]> {
    const allProducts = this.model.getAllProducts();
    return allProducts;
  }

  public async createProduct(product: IProduct): Promise<IServiceReturn> {
    const isValidProduct = ProductService.validationProduct(product);
    if (isValidProduct) { return isValidProduct; }
    
    const newProduct = await this.model.createProduct(product);
    
    return { type: 201, message: newProduct };
  }
}

export default ProductService;