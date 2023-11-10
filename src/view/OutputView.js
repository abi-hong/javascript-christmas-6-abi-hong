import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  announcement(output) {
    Console.print(`${output}`);
  },

  moneyInfo(message, output) {
    Console.print(`
<${message}>
${output}원`);
  },

  eventInfo(message, output) {
    Console.print(`
<${message}>
${output}`);
  },

  menu(orderList) {
    this.announcement('<주문메뉴>');
    orderList.map((order) => Console.print(`${order[0]} ${order[1]}개`));
  },
}

export default OutputView;