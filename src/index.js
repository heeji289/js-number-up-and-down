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

/**
 * 1~50 사이 랜덤 숫자 생성
 */
function getRandomNumber() {
  return Math.floor(Math.random() * 50);
}

async function restartGame() {
  const isRestart = await readLineAsync(
    '게임을 다시 시작하시겠습니까? (yes/no): '
  );
  if (isRestart.toLowerCase() === 'yes') {
    return true;
  } else {
    console.log('게임을 종료합니다.');
    return false;
  }
}

async function play() {
  let chance = MAX_CHANCE; // 남은 기회를 나타내는 변수
  let log; // 사용자 입력을 저장하는 배열
  let answer;

  while (true) {
    if (chance === MAX_CHANCE) {
      // 변수 초기화
      log = [];
      answer = getRandomNumber();
      console.log(
        '컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.'
      );
    }

    chance--;

    if (chance < 0) {
      console.log(`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`);

      if (await restartGame()) {
        chance = MAX_CHANCE;
        continue;
      } else break;
    }

    const userInput = await readLineAsync('숫자 입력:');
    const userInputNumber = Number(userInput);

    // 입력값 유효성 검사 필요

    log.push(userInputNumber);

    if (userInputNumber === answer) {
      console.log(`정답!
축하합니다! ${log.length}번 만에 숫자를 맞추셨습니다.`);
      if (await restartGame()) {
        chance = MAX_CHANCE;
        continue;
      } else break;
    }

    if (userInputNumber > answer) {
      console.log('다운');
    } else {
      console.log('업');
    }

    console.log(`이전 추측: ${log.join(' ')}\n`);
  }
}

play();
