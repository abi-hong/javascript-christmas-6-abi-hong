import { Console } from '@woowacourse/mission-utils';

const OutputView = {
    announcement(output) {
        Console.print(`${output}`);
    },
    menu(orderList) {
        this.announcement('<주문메뉴>');
        orderList.map((order) => Console.print(`${order[0]} ${order[1]}개`));
    },
}

export default OutputView;