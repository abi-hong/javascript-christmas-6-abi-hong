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
    console.log('menus', menus);
    OutputView.menu(this.#orderList);
    Calculate.beforeDiscountPrice(menus);
  }
  
  async #handleInput(inputView, validator) {
    const input = await inputView();
    if (!validator(input)) return this.#handleInput(inputView, validator);
    return input;
  }

  #getOrderMenu(menuList) {
    menuList.forEach((menu) => this.#orderList.push(menu.split('-')));
    const menus = Array.from(this.#orderList, (order) => (new Menu(order[0], order[1])));
    //const menus = this.#orderList.map((order) => (new Menu(order[0], order[1])));
    menus.forEach((menu) => menu.checkMenu());
    console.log('menus~', menus);
    menus.forEach((menu) => {
      console.log('menu^^', menu);
      console.log('name', menu.getName());
      console.log('count', menu.getCount());
    })
    return menus;
  }
}

export default Order;
