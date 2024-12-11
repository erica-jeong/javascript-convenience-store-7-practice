class Product {
  constructor(name, price, quantity, promotion) {
    this.name = name;
    this.price = Number(price);
    this.quantity = Number(quantity);
    if (promotion === 'null') {
      this.promotion = null;
    } else {
      this.promotion = promotion;
    }
  }
}

export default Product;