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
  const input = await readLineAsync(promt);
  // 유효성 검사
  return Number(input);
}

function initGame() {
  const answer = getRandomNumber();
  let guessLog = [];
  let attemptCount = 0;

  console.log('컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.');

  return { answer, guessLog, attemptCount };
}

async function restartGame() {
  const isRestartGame = await readLineAsync(
    '게임을 다시 시작하시겠습니까? (yes/no): '
  );

  if (isRestartGame === 'no') {
    console.log('게임을 종료합니다.');
    return;
  }

  playGame();
}

async function playGame() {
  let { answer, guessLog, attemptCount } = initGame();

  while (attemptCount < MAX_CHANCE) {
    const userInput = await getUserInput('숫자 입력: ');
    attemptCount++;
    guessLog.push(userInput);

    if (userInput === answer) {
      console.log(
        `정답!축하합니다! ${attemptCount}번 만에 숫자를 맞추셨습니다.`
      );
      break;
    }

    console.log(userInput < answer ? '업' : '다운');
    console.log(`이전 추측: ${guessLog.join(' ')}\n`);
  }

  if (attemptCount === 5) {
    console.log(`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`);
  }

  // 정답이거나 회수를 모두 소진하여 재시작
  restartGame();
}

playGame();
