import readline from 'readline';

/**
 * 콘솔에서 사용자의 입력을 받습니다.
 */
export function readLineAsync(query) {
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
 * 주어진 최소값, 최대값 사이에 랜덤한 정수를 리턴합니다.
 */
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}
