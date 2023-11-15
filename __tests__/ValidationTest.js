import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import { EXCEPTION } from '../src/utils/Constant.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

describe('크리스마스 프로모션 입력 테스트', () => {
  test('방문할 날짜는 1 이상 31 이하의 숫자가 아니면 예러 메세지를 출력한다.', async () => {
    // given
    const INPUTS_TO_END = ["1", "해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(['a', ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(EXCEPTION.day));
  });

  test('고객이 메뉴판에 없는 메뉴를 입력하는 경우 에러 메세지를 출력한다.', async () => {
    // given
    const INPUTS_TO_END = ["해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(['1', "해산물-2", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(EXCEPTION.order));
  });

  test('메뉴의 개수는 1 이상의 숫자가 아닌 것을 입력하는 경우 에러 메세지를 출력한다.', async () => {
    // given
    const INPUTS_TO_END = ["해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(['1', "해산물파스타-a", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(EXCEPTION.order));
  });

  test('중복 메뉴를 입력한 경우 에러 메세지를 출력한다.', async () => {
    // given
    const INPUTS_TO_END = ["해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(['1', "시저샐러드-1,시저샐러드-1", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(EXCEPTION.order));
  });

  test('음료만 주문할 경우 에러 메세지를 출력한다.', async () => {
    // given
    const INPUTS_TO_END = ["해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(['1', "제로콜라-1", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(EXCEPTION.onlyDrink));
  });

  test('메뉴를 한 번에 최대 20개 이상 주문한 경우 에러 메세지를 출력한다.', async () => {
    // given
    const INPUTS_TO_END = ["해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(['1', "해산물파스타-200", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(EXCEPTION.count));
  });
});