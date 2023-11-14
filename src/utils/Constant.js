export const MENU_LIST = [
  '양송이수프',
  '타파스',
  '시저샐러드',
  '티본스테이크',
  '바비큐립',
  '해산물파스타',
  '크리스마스파스타',
  '초코케이크',
  '아이스크림',
  '제로콜라',
  '레드와인',
  '샴페인'
]

export const MENU_DRINK = [
  '제로콜라', '레드와인', '샴페인'
]

export const MENU_PRICE = {
  0: 6000, //'양송이수프': 6000,
  1: 5500, //'타파스': 5500,
  2: 8000, //'시저샐러드': 8000,
  3: 55000, //'티본스테이크': 55000,
  4: 54000, //'바비큐립': 54000,
  5: 35000, //'해산물파스타': 35000,
  6: 25000, //'크리스마스파스타': 25000,
  7: 15000, //'초코케이크': 15000,
  8: 5000, //'아이스크림': 5000,
  9: 3000, //'제로콜라': 3000,
  10: 60000, //'레드와인' : 60000,
  11: 25000, //'샴페인': 25000,
}

export const SPECIALDAY = [
  3, 
  10,
  17,
  24,
  25,
  31
]

export const BADGE = {
  santa: '산타',
  tree: '트리',
  star: '별',
  none: '없음',
}

export const NOEVENT_MESSAGE = {
  freeGift : '\n<증정 메뉴>\n없음',
  event: '\n<혜택 내역>\n없음',
  totalBenefit: '\n<총혜택 금액>\n0원',
  totalDiscount: (totalPrice) => (`\n<할인 후 예상 결제 금액>\n${totalPrice}원`),
  badge: '\n<12월 이벤트 배지>\n없음',
}
export const TITLE_MESSAGE = {
  menu: '<주문 메뉴>',
  freeGift: '\n<증정 메뉴>',
  benefit: '\n<혜택 내역>',
}

export const BENEFIT_HISTORY = {
  champagne: '샴페인 1개',
  christmas: (christmasDiscount) => (`크리스마스 디데이 할인: -${christmasDiscount}원`),
  weekday: (weekdayDiscount) => (`평일 할인: -${weekdayDiscount}원`),
  weekend: (weekendDiscount) => (`주말 할인: -${weekendDiscount}원`),
  special: (specialDiscount) => (`특별 할인: -${specialDiscount}원`),
  isFreeGift: '증정 이벤트: -25,000원',
  none: '없음',
}

export const MESSAGE = {
  date: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  menu: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  announcement: (orderDate) => (`12월 ${orderDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`),
  price: (totalPrice) => (`\n<할인 전 총주문 금액>\n${totalPrice}원`),
  discount: (totalBenefit) => (`\n<총혜택 금액>\n-${totalBenefit}원`),
  payment: (expectPayment) => (`\n<할인 후 예상 결제 금액>\n${expectPayment}원`),
  badge: (eventBadge) => (`\n<12월 이벤트 배지>\n${eventBadge}`),
}

export const EXCEPTION = {
  day: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  order: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  count: '[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.',
  onlyDrink: '[ERROR] 음료만 주문 시, 주문할 수 없습니다. 다시 입력해 주세요.',
}