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
}

export default ConvenienceStore;
