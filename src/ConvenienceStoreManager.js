import ConvenienceStore from './ConvenienceStore.js'
import InputView from './InputView.js'
import Item from './Item.js'
import OutputView from './OutputView.js'
import Validate from './Validate.js'

class ConvenienceStoreManager {
  #inputView
  #outputView
  #validate
  #products
  #promotions
  #convenience

  constructor(product, promotion) {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
    this.#validate = new Validate();
    this.#products = product;
    this.#promotions = promotion;
    this.#convenience = new ConvenienceStore()
  }

  async start() {
    try {
      this.#outputView.printProductList(this.#products);
      const boughtItem = await this.#buyItem();
      this.#convenience.checkPromotion(this.#products, boughtItem);
      // console.log(boughtItem)
      this.#convenience.promotionProcess(this.#products, this.#promotions, boughtItem);
      // console.log(this.#products)
    } catch (error) {
      throw error;
    }
  }

  async #buyItem() {
    while (true) {
      try {
        const input = await this.#inputView.readItem();
        const items = this.saveItem(input);
        const productsName = this.getProductsName();
        const totalQuantity = this.getTotalQuantity();
        console.log(totalQuantity)
        this.#validate.exceptItem(input, items, productsName, totalQuantity);
        return items;
      } catch (error) {
        this.#outputView.printErrorMessage(error.message);
      }
    }
  }

  saveItem(inputItems) {
    const savedItem = [];
    const items = inputItems.split(',');
    items.forEach(item => {
      const [name, quantity] = item.slice(1, -1).split('-');
      savedItem.push(new Item(name, quantity));
    });
    return savedItem;
  }

  getProductsName() {
    return [...new Set(this.#products.map(product => product.name))];
  }

  getTotalQuantity() {
    const totalQuantity = [];
    this.#products.forEach(product => {
      const exist = totalQuantity.find(item => item.name === product.name);
      // console.log(exist)
      if (exist) {
        totalQuantity.find(element => exist.name === element.name).quantity += product.quantity;
      } else {
        totalQuantity.push({ name: product.name, quantity: product.quantity });
      }
    });
    return totalQuantity;
  }
}

export default ConvenienceStoreManager;
