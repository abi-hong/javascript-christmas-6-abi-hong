import Calculate from "../src/model/Calculate";
import Menu from "../src/model/Menu";
import { BADGE } from "../src/utils/Constant";

describe('이벤트에 따른 혜택 금액 계산 테스트', () => {
  const orderDate = 3;
  const totalPrice = 142000;
  const menus = [
    new Menu(3, 1),
    new Menu(4, 1),
    new Menu(7, 2),
    new Menu(9, 1)
  ];
  const discountTotal = 6246;
  const isFreeGift = true;
  const totalBenefit = 31246;

  test('할인 전 총주문 금액을 정확히 계산한다.', () => {
    expect(Calculate.beforeDiscountPrice(menus)).toBe(totalPrice);
  });
  
  test('증정 이벤트를 받는지 확인한다.', () => {
    expect(Calculate.isFreeGift(totalPrice)).toBe(true);
  });

  test('크리스마스 디데이 할인 금액을 정확히 계산한다.', () => {
    expect(Calculate.christamDiscount(orderDate)).toBe(1200);
  });

  test('평일 할인 금액을 정확히 계산한다.', () => {
    expect(Calculate.weekdayDiscount(orderDate, menus)).toBe(4046);
  });

  test('주말 할인 금액을 정확히 계산한다.', () => {
    expect(Calculate.weekendDiscount(orderDate, menus)).toBe(0);
  });

  test('특별 할인 금액을 정확히 계산한다.', () => {
    expect(Calculate.specialDiscount(orderDate)).toBe(1000);
  });

  test('총혜택 금액을 정확히 계산한다.', () => {
    expect(Calculate.totalBenefit(discountTotal, isFreeGift)).toBe(totalBenefit);
  });

  test('어떤 이벤트 배지를 받는지 정확히 계산한다.', () => {
    expect(Calculate.eventBadge(totalBenefit)).toBe(BADGE.santa);
  });

  test('할인 후 예상 결제 금액을 정확히 계산한다.', () => {
    expect(Calculate.expectPayment(totalPrice, discountTotal)).toBe(135754);
  });
});