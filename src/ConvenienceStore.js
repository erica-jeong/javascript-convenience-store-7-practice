class ConvenienceStore {
  checkPromotion(products, boughtItem) {
    const boughtItemName = boughtItem.map(item => item.name);
    products.forEach(product => {
      if (product.promotion !== null && boughtItemName.includes(product.name)) {
        const foundItem = boughtItem.find(item => item.name === product.name);
        foundItem.promotion = product.promotion;
      }
    })
  }

  promotionProcess(products, promotions, boughtItem) {
    // 일반 상품인지 판단.
    boughtItem.forEach(item => {
      if (!item.hasOwnProperty('promotion')) {
        this.generalProcess(item, products);
      }
    });
  }

  generalProcess(item, products) {
    products.forEach(product => {
      if (product.name === item.name && product.promotion === null) {
        product.quantity -= item.quantity;
      }
    })
  }


}

export default ConvenienceStore;
