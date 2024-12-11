import { Console } from "@woowacourse/mission-utils";

const WELCOME_MESSAGE = '안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n'

class OutputView {
  printErrorMessage(errorMessage) {
    Console.print(errorMessage);
  }

  printProductList(products) {
    Console.print(WELCOME_MESSAGE);
    products.forEach(product => {
      let quantity = '';
      let promotion = '';
      if (product.quantity === 0) {
        quantity = '재고없음';
      } else {
        quantity = `${product.quantity}개`;
      }
      if (product.promotion !== null) {
        promotion = product.promotion;
      }
      Console.print(`- ${product.name} ${product.price.toLocaleString()} ${quantity} ${promotion}`);
    });
  }
}

export default OutputView;
