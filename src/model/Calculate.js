const Calculate = {
  // 할인 전 총주문 금액 계산 로직
  beforeDiscountPrice(menus) {
    console.log('beforeDiscountPrice', menus);
    return menus.reduce((prev, menu) => {
      console.log('menu.menuPrice()', menu.menuPrice());
      return prev + menu.menuPrice();
    }, 0)
  }
  // 증정 이벤트 로직
  // 크리스마스 디데이 할인 계산 로직
  // 평일 할인(일~목) 계산 로직
  // 주말 할인(금, 토) 계산 로직
}

export default Calculate;