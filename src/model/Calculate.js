import Calendar from '../utils/Calendar.js';
import { BADGE, SPECIALDAY } from '../utils/Constant.js';

const Calculate = {
  // 할인 전 총주문 금액 계산 로직
  beforeDiscountPrice(menus) {
    return menus.reduce((prev, menu) => {
      return prev + menu.menuPrice();
    }, 0)
  },

  // 증정 이벤트 로직
  isFreeGift(totalPrice) {
    if (totalPrice >= 120000) return true;
    return false;
  },

  // 크리스마스 디데이 할인 계산 로직
  christamDiscount(number) {
    const orderDate = Calendar.numberDate(number);
    if (orderDate >= 1 && orderDate <= 25) {
      return 1000 + 100 * (orderDate - 1);
    } 
    return 0;
  },

  // 평일 할인(일~목 => 0,1,2,3,4) 계산 로직
  weekdayDiscount(number, menus) {
    const orderDay = Calendar.numberDay(number);
    if (orderDay >= 0 && orderDay <= 4) {
      const dessertCount = menus.reduce((prev, menu) => {
        if (menu.isDessert())
          return prev + menu.isDessert();
        return prev;
      }, 0)
      return dessertCount * 2023;
    }
    return 0;
  }, 
  // 주말 할인(금, 토 => 5,6) 계산 로직
  weekendDiscount(number, menus) {
    const orderDay = Calendar.numberDay(number);
    if (orderDay === 5 || orderDay === 6) {
      const mainCount = menus.reduce((prev, menu) => {
        if (menu.isMain())
          return prev + menu.isMain();
        return prev;
      }, 0)
      return mainCount * 2023;
    }
    return 0;
  },

  // 특별 할인 계산 → 로직이벤트 달력에 별이 있으면 총주문 금액에서 1,000원 할인
  specialDiscount(number) {
    const orderDate = Calendar.numberDate(number);
    if (SPECIALDAY.includes(orderDate)) return 1000;
    return 0;
  },

   // 총혜택 금액 계산 로직 → 총혜택 금액 = 할인 금액의 합계 + 증정 메뉴의 가격
   totalBenefit(discountTotal, isFreeGift) {
    if (isFreeGift) return discountTotal + 25000;
    return discountTotal;
   },

   // 이벤트 배지 계산 로직 → 총혜택 금액에 따라 다른 이벤트 배지
   eventBadge(totalBenefit) {
    if (totalBenefit >= 20000) return BADGE.santa;
    else if (totalBenefit >= 10000) return BADGE.tree;
    else if (totalBenefit >= 5000) return BADGE.star;
    return BADGE.none;
   },

   // 할인 후 예상 결제 금액 계산 로직 → 할인 후 예상 결제 금액 = 할인 전 총주문 금액 - 할인 금액
   expectPayment(totalPrice, discountTotal) {
    return totalPrice - discountTotal;
   },
}

export default Calculate;