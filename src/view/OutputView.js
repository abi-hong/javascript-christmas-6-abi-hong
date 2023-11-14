import { Console } from '@woowacourse/mission-utils';
import { MESSAGE, NOEVENT_MESSAGE, TITLE_MESSAGE, BENEFIT_HISTORY } from '../utils/Constant.js';

const OutputView = {
  menu(orderDate, orderList) {
    Console.print(MESSAGE.announcement(orderDate));
    Console.print(TITLE_MESSAGE.menu);
    orderList.map((order) => Console.print(`${order[0]} ${order[1]}개`));
  },

  totalPrice(totalPrice) {
    Console.print(MESSAGE.price(totalPrice));
  },

  noEvent(totalPrice) {
    Console.print(NOEVENT_MESSAGE.freeGift);
    Console.print(NOEVENT_MESSAGE.event);
    Console.print(NOEVENT_MESSAGE.totalBenefit);
    Console.print(NOEVENT_MESSAGE.totalDiscount(totalPrice));
    Console.print(NOEVENT_MESSAGE.badge);
  },

  freeGift(isFreeGift) {
    Console.print(TITLE_MESSAGE.freeGift);
    if (isFreeGift) Console.print(BENEFIT_HISTORY.champagne);
    else Console.print(BENEFIT_HISTORY.none);
  },

  eventBenefit(christmasDiscount, weekdayDiscount, weekendDiscount, specialDiscount, isFreeGift) {
    Console.print(TITLE_MESSAGE.benefit);
    if (christmasDiscount) Console.print(BENEFIT_HISTORY.christmas);
    if (weekdayDiscount) Console.print(BENEFIT_HISTORY.weekday);
    if (weekendDiscount) Console.print(BENEFIT_HISTORY.weekend);
    if (specialDiscount) Console.print(BENEFIT_HISTORY.special);
    if (isFreeGift) Console.print(BENEFIT_HISTORY.isFreeGift);
  },

  totalBenefit(totalBenefit, expectPayment, eventBadge) {
    Console.print(MESSAGE.discount(totalBenefit));
    Console.print(MESSAGE.payment(expectPayment));
    Console.print(MESSAGE.badge(eventBadge));
  }
}

export default OutputView;