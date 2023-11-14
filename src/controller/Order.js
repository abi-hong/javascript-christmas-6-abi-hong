import Calculate from "../model/Calculate.js";
import Validator from "../utils/Validator.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import Menu from '../model/Menu.js';

class Order {
  #orderList = []

  async start() {
    const orderDate = await this.#handleInput(InputView.visitDate, Validator.checkDate);
    const menuList = await this.#handleInput(InputView.orderMenu, Validator.checkMenu);
    const menus = this.#getOrderMenu(menuList);
    const totalPrice = Calculate.beforeDiscountPrice(menus);
    const isFreeGift = Calculate.isFreeGift(totalPrice);
    OutputView.menu(orderDate, this.#orderList);
    OutputView.totalPrice(totalPrice);
    if (totalPrice > 10000) {
      const discountTotal = this.calculateDiscount(orderDate, menus, isFreeGift);
      this.calculatePrice(discountTotal, isFreeGift, totalPrice);
    } else OutputView.noEvent(totalPrice);
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

  calculateDiscount(orderDate, menus, isFreeGift) {
    const christmasDiscount = Calculate.christamDiscount(orderDate);
    const weekdayDiscount = Calculate.weekdayDiscount(orderDate, menus);
    const weekendDiscount = Calculate.weekendDiscount(orderDate, menus);
    const specialDiscount = Calculate.specialDiscount(orderDate);
    const discountTotal = christmasDiscount + weekdayDiscount + weekendDiscount + specialDiscount;
    OutputView.freeGift(isFreeGift);
    OutputView.eventBenefit(christmasDiscount, weekdayDiscount, weekendDiscount, specialDiscount, isFreeGift);
    return discountTotal;
  }

  calculatePrice(discountTotal, isFreeGift, totalPrice) {
    const totalBenefit = Calculate.totalBenefit(discountTotal, isFreeGift);
    const expectPayment = Calculate.expectPayment(totalPrice, discountTotal);
    const eventBadge = Calculate.eventBadge(totalBenefit);
    OutputView.totalBenefit(totalBenefit, expectPayment, eventBadge);
  }
}

export default Order;