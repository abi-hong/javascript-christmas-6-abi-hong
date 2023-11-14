import { Console } from "@woowacourse/mission-utils";
import { MENU_LIST, MENU_DRINK } from './Constant.js';

const Validator = {
  checkDate(input) {
    const strInput = String(input)
    if (/^(?:[1-9]|[12]\d|3[01])$/.test(strInput)) return true;
    Console.print('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    return false;
  },
  checkMenuName(nameList) {
    for (let i = 0; i < nameList.length; i++) {
      if (!MENU_LIST.includes(nameList[i])) {
        Console.print('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
        return false;
      }
    }
    return true;
  },
  checkMenuCount(countList) {
    for (let i = 0; i < countList.length; i++) {
      if (/^[1-9]\d*$/.test(countList[i])) return true;
    }
    Console.print('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    return false;
  },
  checkNotDuplicateMenu(nameList) {
    const isNotDuplicate = nameList.filter((name, index) => nameList.indexOf(name) !== index);
    if (isNotDuplicate.length === 0) return true;
    Console.print('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    return false;
  },
  checkTotalMenuCount(nameList, countList) {
    let dessertCount = 0;
    const totalCount = countList.reduce((prev, count) => { 
      prev += Number(count);
      return prev;
    }, 0);
    if (totalCount > 21) {
      Console.print('[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.');
      return false;
    }
    for (let i = 0; i < nameList.length; i++) {
      if (MENU_DRINK.includes(nameList[i])) dessertCount += 1;
    }
    if (dessertCount !== totalCount) return true;
    Console.print('[ERROR] 음료만 주문 시, 주문할 수 없습니다. 다시 입력해 주세요.');
    return false;
  },

  checkMenu(menuList) {
    const input = [];
    const name = [];
    const count = [];
    menuList.forEach((menu) => input.push(menu.split('-')));
    input.forEach((menu) => {
      name.push(menu[0]);
      count.push(menu[1]);
    })
    if (!Validator.checkMenuName(name)) return false;
    else if (!Validator.checkMenuCount(count)) return false;
    else if (!Validator.checkNotDuplicateMenu(name)) return false;
    else if (!Validator.checkTotalMenuCount(name, count)) return false;
    return true;
  },
}

export default Validator;