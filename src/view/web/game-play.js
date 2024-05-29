import GameConfigView from './game-config';
import { Status } from '../../constants';

export default class GamePlayView {
  template = /*html*/ `
    <div>
        <p>HEEJI</p>
        <form type="submit" class="user_input_form">
            <input type="number" name="user_input" class="user_input">
            <button class="submit_button">제출</button>
        </form>

        <div class="log"></div>

        <button class="restart_button">재시도</button>
    </div>
  `;

  #game; // game 인스턴스
  #log; // 게임 진행 내용 출력용
  $parentElement;

  constructor(parentElement, game) {
    this.$parentElement = parentElement;
    this.#game = game;
    this.#log = [];

    this.render();
    this.addEvent();
  }

  render() {
    this.$parentElement.innerHTML = this.template;
  }

  addEvent() {
    const $userInputForm = document.querySelector('.user_input_form');
    const $userInput = document.querySelector('.user_input');
    const $restartButton = document.querySelector('.restart_button');

    $userInputForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const userInput = Number(new FormData(e.target).get('user_input') ?? '0');
      const result = this.#game.playRound(userInput);

      $userInput.value = ''; // input 초기화

      const resultText =
        result === Status.SUCCESS
          ? '성공'
          : result === Status.UP
            ? '업!'
            : '다운!!';

      this.#log = [...this.#log, resultText];
      this.rerenderLog();
    });

    $restartButton.addEventListener('click', (e) => {
      new GameConfigView(this.$parentElement);
    });
  }

  rerenderLog() {
    const logContainer = document.querySelector('.log');
    logContainer.innerHTML = this.#log.join('<br>');
  }
}
