const EMPTY_INPUT = '[ERROR] 공백이 입력되었습니다.';
const NOT_A_NUMBER = '[ERROR] 숫자를 입력해주세요.';
const INVALID_DECIMAL = '[ERROR] 정수를 입력해주세요.';
const POSITIVE_NUMBER = '[ERROR] 음수가 입력되었습니다.';
const INVALID_CONFIRMATION = '[ERROR] Y 또는 N을 입력해주세요.'
const INVALID_ITEM_FORMAT = '[ERROR] 입력 형식을 지켜주세요'
const INVALID_ITEM_NAME = '[ERROR] 상품 목록에 없는 상품입니다.'
const INVALID_ITEM_COUNT = '[ERROR] 입력하신 수량이 상품 재고 수량보다 많습니다.'

class Validate {
  isEmpty(input) {
    if (!input.trim()) {
      throw new Error(EMPTY_INPUT);
    }
  }

  isNumber(input) {
    const numberInput = Number(input);
    if (Number.isNaN(numberInput)) {
      throw new Error(NOT_A_NUMBER);
    }
  }

  isInteger(input) {
    if (!Number.isInteger(Number(input))) {
      throw new Error(INVALID_DECIMAL);
    }
  }

  isPositiveNumber(input) {
    if (input <= 0) {
      throw new Error(POSITIVE_NUMBER);
    }
  }

  isYesOrNo(input) {
    if (input !== 'Y' && input !== 'N') {
      throw new Error(INVALID_CONFIRMATION);
    }
  }

  exceptItem(input, items, productsName, totalQuantity) {
    this.isEmpty(input);
    this.checkFormat(input);
    this.checkNameQuantity(items, productsName, totalQuantity);
  }

  checkFormat(input) {
    const items = input.split(',').map(item => item.trim());
    const pattern = /^\[([가-힣a-zA-Z0-9\s]+)-(\d+)\]$/;

    items.forEach(item => {
      const match = item.match(pattern);
      if (!match) {
        throw new Error(INVALID_ITEM_FORMAT);
      }
    })
  }

  checkNameQuantity(items, productsName, totalQuantity) {
    items.forEach(item => {
      if (!productsName.includes(item.name)) {
        throw new Error(INVALID_ITEM_NAME);
      }
      const totalQ = totalQuantity.find(total => total.name === item.name).quantity;
      if (item.quantity > totalQ) {
        throw new Error(INVALID_ITEM_COUNT);
      }
    })
  }
}

export default Validate;
