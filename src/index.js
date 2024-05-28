import { Status } from './constants';
import Game from './domain/game';

const $root = document.querySelector('#root');
$root.innerHTML = /*html*/ `
  <h1>숫자 업&다운 Game</h1>
  <container class="container"></container>
`;

const gameConfigViewTemplate = /*html*/ `
  <p>게임 설정</p>
  <p>숫자 범위</p>

  <form class="game_config_form">
      <input type="number" name="min" />
      <input type="number" name="max" />

      <p>실행 가능 횟수</p>
      <input type="number" name="chance" />
      <br />

      <button class="start_button">시작하기</button>
  </form>
`;

const $container = document.querySelector('.container');
$container.innerHTML = gameConfigViewTemplate;

let game;
const log = [];

const form = document.querySelector('.game_config_form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const min = Number(formData.get('min') ?? '0');
  const max = Number(formData.get('max') ?? '0');
  const chance = Number(formData.get('chance') ?? '0');

  game = new Game({ min, max, chance });

  $container.innerHTML = '';
  $container.innerHTML = /*html*/ `
    <div>
        <p>HEEJI</p>
        <form type="submit" class="user_input_form">
            <input type="number" name="user_input"class="user_input">
            <button class="submit_button">제출</button>
        </form>

        <div class="log">${log.join('\n')}</div>

        <button class="restart_button">재시도</button>
    </div>
  `;

  const userInputForm = document.querySelector('.user_input_form');
  const $userInput = document.querySelector('.user_input');

  userInputForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userInput = Number(new FormData(e.target).get('user_input') ?? '0');
    const result = game.playRound(userInput);

    $userInput.value = '';

    if (result === Status.SUCCESS) {
      log.push('성공');
      renderLog();
      return;
    }

    log.push(result === Status.UP ? '업!' : '따운!');
    renderLog();
  });

  const $restartButton = document.querySelector('.restart_button');
  $restartButton.addEventListener('click', (e) => {
    $container.innerHTML = gameConfigViewTemplate;
  });
});

function renderLog() {
  const logContainer = document.querySelector('.log');
  logContainer.innerHTML = log.join('<br>');
}
