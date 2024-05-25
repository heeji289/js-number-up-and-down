import { Status } from '../constants';
import { getRandomNumber } from '../utils';

export default class Game {
  #answer;
  #guessLog;
  #attemptCount;

  #min;
  #max;
  #chance;

  constructor({ min, max, chance }) {
    this.#answer = getRandomNumber(min, max);
    this.#guessLog = [];
    this.#attemptCount = 0;

    this.#min = min;
    this.#max = max;
    this.#chance = chance;
  }

  playRound(userInputNumber) {
    this.#attemptCount++;
    this.#guessLog.push(userInputNumber);

    if (userInputNumber === this.#answer) {
      return Status.SUCCESS;
    }

    return userInputNumber < this.#answer ? Status.UP : Status.DOWN;
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
