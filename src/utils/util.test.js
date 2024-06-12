import { getRandomNumber } from '.';

describe('util', () => {
  describe('getRandomNumber', () => {
    it('최소값, 최대값 사이의 숫자가 생성된다.', () => {
      const result = getRandomNumber(1, 50);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(50);
    });
  });
});
