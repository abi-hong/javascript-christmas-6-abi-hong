import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../utils/Constant';

const InputView = {
    async visitDate() {
        const input = await Console.readLineAsync(MESSAGE.date);
        return Number(input);
    },
    async orderMenu() {
        const input = await Console.readLineAsync(MESSAGE.menu);
        const orderList = input.split(',');
        return orderList;
    },
}

export default InputView;