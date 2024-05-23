import { getRandomNumber } from '../utils';

export default class Game {
  #answer;
  #guessLog = [];
  #attemptCount = 0;

  #min;
  #max;
  #chance;

  constructor({ min, max, chance }) {
    this.#answer = getRandomNumber(min, max);

    this.#min = min;
    this.#max = max;
    this.#chance = chance;
  }

  playRound(userInputNumber) {
    this.#attemptCount++;
    this.#guessLog.push(userInputNumber);

    if (userInputNumber === this.#answer) {
      return 'success';
    }

    return userInputNumber < this.#answer ? 'up' : 'down';
  }

  get attemptCount() {
    return this.#attemptCount;
  }

  get chance() {
    return this.#chance;
  }

  get guessLog() {
    return this.#guessLog;
  }

  get answer() {
    return this.#answer;
  }

  get min() {
    return this.#min;
  }

  get max() {
    return this.#max;
  }
}
