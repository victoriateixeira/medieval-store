import connection from '../models/connection';
import ProductModel from '../models/product.model';
import { IProduct } from '../interfaces';

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
  
  static validateValues(product: IProduct): [boolean, string | null] {
    const entries = Object.entries(product);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (!value) {
        return [false, property];
      }
    }
    return [true, null];
  }
  
  static validationBook(product: IProduct): void | string {
    let [valid, property] = ProductService.validateProperties(product);
  
    if (!valid) {
      return `O campo ${property} é obrigatório.`;
    }

    [valid, property] = ProductService.validateValues(product);
  
    if (!valid) {
      return `O campo ${property} não pode ser nulo ou vazio.`;
    }
  }
  
  public async createProduct(product: IProduct): Promise<IProduct> {
    return this.model.createProduct(product);
  }
}

export default ProductService;