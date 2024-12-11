import InputView from './InputView.js'
import OutputView from './OutputView.js'
import Validate from './Validate.js'

class ConvenienceStoreManager {
  #inputView
  #outputView
  #validate
  #products
  #promotions

  constructor(product, promotion) {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
    this.#validate = new Validate();
    this.#products = product;
    this.#promotions = promotion;
  }

  async start() {
    try {
      this.#outputView.printProductList(this.#products);
    } catch (error) {
      throw error;
    }
  }

}

export default ConvenienceStoreManager;
