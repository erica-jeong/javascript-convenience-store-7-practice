import { Console } from "@woowacourse/mission-utils";

const PURCHASE_ITEM = '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n';

class InputView {
  async readItem() {
    const input = await Console.readLineAsync(PURCHASE_ITEM);
    return input;
  }
}

export default InputView;
