import Calculate from "../model/Calculate.js";
import Validator from "../utils/Validator.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import Menu from '../model/Menu.js';
import { Console } from "@woowacourse/mission-utils";

class Order {
  #orderList = []

  //프로그램 진행 구현
  async start() {
    const orderDate = await this.#handleInput(InputView.visitDate, Validator.checkDate);
    const menuList = await this.#handleInput(InputView.orderMenu, Validator.checkMenu);
    const menus = this.#getOrderMenu(menuList);
    Console.print(`12월 ${orderDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
    Console.print('<주문 메뉴>');
    OutputView.menu(this.#orderList);

    const totalPrice = Calculate.beforeDiscountPrice(menus);
    const isFreeGift = Calculate.isFreeGift(totalPrice);
    Console.print(`\n<할인 전 총주문 금액>\n${totalPrice}원`);
    if (totalPrice > 10000) {
      // 총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.
      const discountTotal = this.calculateDiscount(orderDate, menus, isFreeGift);
      this.calculatePrice(discountTotal, isFreeGift, totalPrice);
    } 
    else {
      Console.print('\n<증정 메뉴>\n없음');
      Console.print('\n<혜택 내역>\n없음');
      Console.print('\n<총혜택 금액>\n0원');
      Console.print(`\n<할인 후 예상 결제 금액>\n${totalPrice}원`);
      Console.print('\n<12월 이벤트 배지>\n없음');
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

  calculateDiscount(orderDate, menus, isFreeGift) {
    const christmasDiscount = Calculate.christamDiscount(orderDate);
    const weekdayDiscount = Calculate.weekdayDiscount(orderDate, menus);
    const weekendDiscount = Calculate.weekendDiscount(orderDate, menus);
    const specialDiscount = Calculate.specialDiscount(orderDate);
    
    // 증정 메뉴 출력
    Console.print('\n<증정 메뉴>');
    if (isFreeGift) Console.print(`샴페인 1개`);
    else Console.print(`없음`);

    // 혜택 내역 출력
    OutputView.announcement('\n<혜택 내역>');
    if (christmasDiscount) Console.print(`크리스마스 디데이 할인: -${christmasDiscount}원`);
    if (weekdayDiscount) Console.print(`평일 할인: -${weekdayDiscount}원`);
    if (weekendDiscount) Console.print(`주말 할인: -${weekendDiscount}원`);
    if (specialDiscount) Console.print(`특별 할인: -${specialDiscount}원`);
    if (isFreeGift) Console.print(`증정 이벤트: -25,000원`);
    const discountTotal = christmasDiscount + weekdayDiscount + weekendDiscount + specialDiscount;
    return discountTotal;
  }

  calculatePrice(discountTotal, isFreeGift, totalPrice) {
    const totalBenefit = Calculate.totalBenefit(discountTotal, isFreeGift);
    const expectPayment = Calculate.expectPayment(totalPrice, discountTotal);
    const eventBadge = Calculate.eventBadge(totalBenefit);
    
    Console.print('\n<총혜택 금액>');
    Console.print(`-${totalBenefit}원`);
    Console.print('\n<할인 후 예상 결제 금액>');
    Console.print(`${expectPayment}원`);
    Console.print('\n<12월 이벤트 배지>');
    Console.print(`${eventBadge}`);
  }
}

export default Order;