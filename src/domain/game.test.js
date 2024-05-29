import { Status } from '../constants';
import { getRandomNumber } from '../utils';
import Game from './game';

jest.mock('../utils', () => ({
  getRandomNumber: jest.fn(),
}));

describe('Game Class', () => {
  it('주어진 값으로 초기화된다.', () => {
    const min = 1;
    const max = 50;
    const chance = 5;
    const game = new Game({ min, max, chance });

    expect(game.guessLog).toEqual([]);
    expect(game.attemptCount).toBe(0);
    expect(game.min).toBe(min);
    expect(game.max).toBe(max);
    expect(game.chance).toBe(chance);
  });

  describe('playRound', () => {
    let game;

    const min = 1;
    const max = 50;
    const chance = 5;
    const answer = 42;

    beforeEach(() => {
      getRandomNumber.mockReturnValue(answer);
      game = new Game({ min, max, chance });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('입력이 정답과 같을 때 SUCCESS를 리턴한다.', () => {
      expect(game.playRound(game.answer)).toBe(Status.SUCCESS);
    });

    it('입력이 정답보다 클 때 UP을 리턴한다.', () => {
      expect(game.playRound(game.answer - 10)).toBe(Status.UP);
    });

    it('입력이 정답보다 작을 때 DOWN을 리턴한다.', () => {
      expect(game.playRound(game.answer + 10)).toBe(Status.DOWN);
    });

    it('입력하면 시도횟수가 증가하고 기록된다', () => {
      game.playRound(1);
      expect(game.attemptCount).toBe(1);
      expect(game.guessLog).toEqual([1]);
    });
  });
});
