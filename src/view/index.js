import { readLineAsync, getRandomNumber } from '../utils';
import Game from '../domain/game';
import { Messages, Status } from '../constants';

export default class GameView {
  async start() {
    let continueGame = true;

    while (continueGame) {
      const game = new Game(1, 50, 5);
      console.log(
        '컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.'
      );
      await this.playGame(game);

      continueGame = await this.askRestartGame();
    }

    console.log(Messages.END);
  }

  async getUserInput(min, max) {
    while (true) {
      const input = await readLineAsync('숫자 입력: ');
      const inputNumber = Number(input);

      if (!isNaN(inputNumber) && inputNumber >= min && inputNumber <= max) {
        return inputNumber;
      }

      console.log(`${Messages.INPUT_ERROR} (${min}-${max})`);
    }
  }

  async askRestartGame() {
    const isRestartGame = await readLineAsync(Messages.RESTART);

    return isRestartGame === 'yes';
  }

  async playGame(game) {
    while (game.attemptCount < game.chance) {
      const userInput = await this.getUserInput(1, 50);
      const result = game.playRound(userInput);

      if (result === Status.SUCCESS) {
        console.log(
          `정답! 축하합니다! ${game.attemptCount}번 만에 숫자를 맞추셨습니다.`
        );
        return;
      }

      console.log(result === Status.UP ? Messages.UP : Messages.DOWN);
      console.log(`이전 추측: ${game.guessLog.join(' ')}\n`);
    }

    console.log(
      `${game.chance}회 초과! 숫자를 맞추지 못했습니다. (정답: ${game.answer})`
    );
  }
}
