import readline from 'readline';

const MAX_CHANCE = 5;

function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error('arguments must be 1'));
    }

    if (typeof query !== 'string') {
      reject(new Error('query must be string'));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

function getRandomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}

async function getUserInput(promt) {
  while (true) {
    const input = await readLineAsync(promt);
    const inputNumber = Number(input);

    if (!isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 50) {
      return inputNumber;
    }

    console.log('유효한 숫자를 입력해주세요 (1-50)');
  }
}

async function askRestartGame() {
  const isRestartGame = await readLineAsync(
    '게임을 다시 시작하시겠습니까? (yes/no): '
  );

  return isRestartGame === 'yes';
}

// ***********************************************

function createGame() {
  // 게임 생성 및 초기화
  const answer = getRandomNumber();
  const guessLog = [];
  let attemptCount = 0;

  console.log('컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.');

  async function play() {
    while (attemptCount < MAX_CHANCE) {
      const userInput = await getUserInput('숫자 입력: ');
      attemptCount++;
      guessLog.push(userInput);

      if (userInput === answer) {
        console.log(
          `정답! 축하합니다! ${attemptCount}번 만에 숫자를 맞추셨습니다.`
        );
        return;
      }

      console.log(userInput < answer ? '업' : '다운');
      console.log(`이전 추측: ${guessLog.join(' ')}\n`);
    }

    console.log(
      `${MAX_CHANCE}회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`
    );
  }

  return { play };
}

async function main() {
  let continueGame = true;

  while (continueGame) {
    const game = createGame();
    await game.play();
    continueGame = await askRestartGame();
  }

  console.log('게임을 종료합니다.');
}

main();
