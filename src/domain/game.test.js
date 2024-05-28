import { Status } from '../constants';
import Game from './game';

describe('Game Class', () => {
  it('init', () => {
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

    beforeEach(() => {
      const min = 1;
      const max = 50;
      const chance = 5;

      game = new Game({ min, max, chance });
    });

    it('입력이 정답과 같을 때', () => {
      expect(game.playRound(game.answer)).toBe(Status.SUCCESS);
    });

    it('입력이 정답보다 클 때', () => {
      expect(game.playRound(game.answer - 10)).toBe(Status.UP);
    });

    it('입력이 정답보다 작을 때', () => {
      expect(game.playRound(game.answer + 10)).toBe(Status.DOWN);
    });

    it('입력하면 시도횟수가 증가하고 기록된다', () => {
      game.playRound(1);
      expect(game.attemptCount).toBe(1);
      expect(game.guessLog).toEqual([1]);
    });
  });
});
