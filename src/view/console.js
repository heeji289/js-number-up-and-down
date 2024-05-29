import { readLineAsync, getRandomNumber } from '../utils';
import Game from '../domain/game';
import { Status } from '../constants';

export default class GameView {
  async start() {
    let continueGame = true;

    while (continueGame) {
      const config = await this.getGameConfig();
      const game = new Game(config);

      console.log(
        `컴퓨터가 ${config.min}~${config.max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`
      );
      await this.playGame(game);

      continueGame = await this.askRestartGame();
    }

    console.log('게임을 종료합니다.');
  }

  async getGameConfig() {
    let min, max, chance;
    let readlineQuery = `[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)
숫자 입력:`;

    while (true) {
      const input = await readLineAsync(readlineQuery);

      [min, max] = input.trim().split(',').map(Number);

      if (!isNaN(min) && !isNaN(max) && min < max) {
        break;
      }

      readlineQuery = `⛔️ 잘못 입력 하셨습니다.
      유효한 최소 값과 최대 값을 입력해주세요. (예: 1, 50)`;
    }

    readlineQuery = `[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.
숫자 입력:`;

    while (true) {
      const input = await readLineAsync(readlineQuery);

      chance = Number(input);

      if (!isNaN(chance) && chance > 0) {
        break;
      }

      readlineQuery = `⛔️ 잘못 입력 하셨습니다.
유효한 진행 가능 횟수를 입력해주세요. (예: 5)`;
    }

    return { min, max, chance };
  }

  async getUserInput(min, max) {
    while (true) {
      const input = await readLineAsync('숫자 입력: ');
      const inputNumber = Number(input);

      if (!isNaN(inputNumber) && inputNumber >= min && inputNumber <= max) {
        return inputNumber;
      }

      console.log(`'유효한 숫자를 입력해주세요' (${min}-${max})`);
    }
  }

  async askRestartGame() {
    const isRestartGame = await readLineAsync(
      '게임을 다시 시작하시겠습니까? (yes/no): '
    );
    return isRestartGame === 'yes';
  }

  async playGame(game) {
    while (game.attemptCount < game.chance) {
      const userInput = await this.getUserInput(game.min, game.max);
      const result = game.playRound(userInput);

      if (result === Status.SUCCESS) {
        console.log(
          `정답! 축하합니다! ${game.attemptCount}번 만에 숫자를 맞추셨습니다.`
        );
        return;
      }

      console.log(result === Status.UP ? '업' : '다운');
      console.log(`이전 추측: ${game.guessLog.join(' ')}\n`);
    }

    console.log(
      `${game.chance}회 초과! 숫자를 맞추지 못했습니다. (정답: ${game.answer})`
    );
  }
}
