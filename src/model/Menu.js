import { MENU_LIST, MENU_PRICE } from "../utils/Constant.js";

class Menu {
  #name;
  #count;

  constructor(name, count) {
    this.#name = name;
    this.#count = count;
  }
  /** 
   * 값을 return 하도록 구현 !!
   */
  getName() {
    return this.#name;
  }
  getCount() {
    return this.#count;
  }

  checkMenu() {
    MENU_LIST.forEach((menu, index) => {
      if (menu === this.#name) this.#name = index;
    })
  }

  // 메뉴 * 수량 가격 리턴
  menuPrice() {
    return MENU_PRICE[this.#name] * this.#count;
  }
  // 메뉴 클래스 리턴
  isDessert(menu) {
    if ((menu === 0) || (menu === 1) || (menu === 2)) return true;
    return false;
  }

  isMain(menu) {
    if ((menu === 3) || (menu === 4) || (menu === 5) || (menu === 6)) return true;
    return false;
  }
}

export default Menu;