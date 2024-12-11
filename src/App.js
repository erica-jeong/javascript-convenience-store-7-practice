import fsp from 'fs/promises';
import Promotion from './Promotion.js'
import ConvenienceStoreManager from './ConvenienceStoreManager.js'
import Product from './Product.js'

const FAIL_FILE_READ = '파일을 읽는데 실패했습니다.';

class App {
  async run() {
    const product = await this.loadProduct();
    const promotion = await this.loadPromotion();

    const convenienceStoreManager = new ConvenienceStoreManager(product, promotion);
    await convenienceStoreManager.start();
  }

  async loadProduct() {
    try {
      const data = await fsp.readFile('./public/products.md', 'utf-8');
      const parseProduct = this.#parseProductData(data);
      const productMap = this.#groupProductsByName(parseProduct);
      return this.#setOutOfStockStatus(productMap);
    } catch (error) {
      throw new Error(FAIL_FILE_READ);
    }
  }

  #parseProductData(data) {
    return data
      .trim()
      .split('\n')
      .slice(1) // 첫번쨰 줄은 필요없으니까
      .map(line => {
        const [name, price, quantity, promotion] = line.split(',').map(item => item.trim());
        return new Product(name, price, quantity, promotion || null); // Product 객체 생성
      });
  }

  #groupProductsByName(products) {
    const productMap = {};
    products.forEach(product => {
      if (!productMap[product.name]) {
        productMap[product.name] = { promotion: null, regular: null };
      }
      this.#assignProductType(productMap, product);
    });
    return productMap;
  }

  #assignProductType(productMap, product) {
    if (product.promotion === null) {
      productMap[product.name].regular = product;
    } else {
      productMap[product.name].promotion = product;
    }
  }

  #setOutOfStockStatus(productMap) {
    this.#addOutOfStockProducts(productMap);
    return this.#generateProductList(productMap);
  }

  #addOutOfStockProducts(productMap) {
    Object.values(productMap).forEach(({ promotion, regular }) => {
      if (!regular && promotion) {
        const outOfStockProduct = new Product(promotion.name, promotion.price, 0, null);
        productMap[promotion.name].regular = outOfStockProduct;
      }
    });
  }

  #generateProductList(productMap) {
    return Object.values(productMap).flatMap(({ promotion, regular }) =>
      [promotion, regular].filter(Boolean)
    );
  }

  async loadPromotion() {
    try {
      const data = await fsp.readFile('./public/promotions.md', 'utf-8');
      return this.#parsePromotionData(data);
    } catch (error) {
      throw new Error(FAIL_FILE_READ);
    }
  }

  #parsePromotionData(data) {
    return data
      .trim()
      .split('\n')
      .slice(1) // 첫번쨰 줄은 필요없으니까
      .map(line => {
        const [name, buy, get, startDate, endDate] = line.split(',').map(item => item.trim());
        return new Promotion(name, buy, get, startDate, endDate); // Promotion 객체 생성
      });
  }

}

export default App;
