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
  isDessert() {
    if ((this.#name === 7) || (this.#name === 8)) return this.#count;
    return 0;
  }
  isMain() {
    if ((this.#name === 3) || (this.#name === 4) || (this.#name === 5) || (this.#name === 6)) return this.#count;
    return 0;
  }
}

export default Menu;