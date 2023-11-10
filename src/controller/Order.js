import Calculate from "../model/Calculate.js";
import Validator from "../utils/Validator.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import Menu from '../model/Menu.js';

class Order {
  #orderList = []

  //프로그램 진행 구현
  async start() {
    const orderDate = await this.#handleInput(InputView.visitDate, Validator.checkDate);
    const menuList = await this.#handleInput(InputView.orderMenu, Validator.checkMenu);
    const menus = this.#getOrderMenu(menuList);
    const totalPrice = Calculate.beforeDiscountPrice(menus);
    if (totalPrice < 10000) {
      // 총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.
    } else {
      const christmasDiscount = Calculate.christamDiscount(orderDate);
      const weekdayDiscount = Calculate.weekdayDiscount(orderDate, menus);
      const weekendDiscount = Calculate.weekendDiscount(orderDate, menus);
    
    }
    
    OutputView.menu(this.#orderList);
    OutputView.moneyInfo('할인 전 총주문 금액', totalPrice);
    if (Calculate.isFreeGift(totalPrice)) {
      OutputView.eventInfo('증정 메뉴', '샴페인 1개');
    } else {
      OutputView.eventInfo('증정 메뉴', '없음');
    }
  }
  
  async #handleInput(inputView, validator) {
    const input = await inputView();
    if (!validator(input)) return this.#handleInput(inputView, validator);
    return input;
  }

  #getOrderMenu(menuList) {
    menuList.forEach((menu) => this.#orderList.push(menu.split('-')));
    const menus = Array.from(this.#orderList, (order) => (new Menu(order[0], order[1])));
    menus.forEach((menu) => menu.checkMenu());
    return menus;
  }
}

export default Order;