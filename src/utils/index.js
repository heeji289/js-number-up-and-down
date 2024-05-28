/**
 * 주어진 최소값, 최대값 사이에 랜덤한 정수를 리턴합니다.
 */
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
