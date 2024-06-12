import GameConfigView from './game-config';
import { Status } from '../../constants';

export default class GamePlayView {
  template = /*html*/ `
    <div>
        <h3 class="remain_chance"></h3>
        <h3 class="input_log"></h3>

        <form type="submit" class="user_input_form">
            <input type="number" name="user_input" class="user_input">
            <button class="submit_button">제출</button>
        </form>

        <div class="log" style="height: 100px; overflow-y: auto"></div>

        <button class="restart_button">재시도</button>
    </div>
  `;

  #game; // game 인스턴스
  #log; // 게임 진행 내용 출력용
  $parentElement;

  constructor(parentElement, game) {
    this.$parentElement = parentElement;
    this.#game = game;
    this.#log = [
      `[컴퓨터] ${this.#game.min}~${this.#game.max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`,
    ];

    this.render();
    this.renderLog();
    this.renderRemainChance();
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
      this.#log = [...this.#log, `[유저] ${userInput}`];

      this.renderRemainChance();
      this.renderInputLog();

      $userInput.value = ''; // input 초기화

      if (result === Status.SUCCESS) {
        this.#log = [...this.#log, '[컴퓨터] 정답을 맞추셨습니다. 🎉'];
        this.renderLog();
        $userInput.disabled = true;
        return;
      }

      //이 때! 정답이 아니면 게임이 실패한 것임
      if (this.#game.checkIsGameOver()) {
        this.#log = [...this.#log, '[컴퓨터] 기회를 모두 소진했습니다. 끝! 💣'];
        this.renderLog();
        // 입력창 비활성화.
        $userInput.disabled = true;
        return;
      }

      this.#log = [
        ...this.#log,
        result === Status.UP ? '[컴퓨터] 업!' : '[컴퓨터] 다운!',
      ];
      this.renderLog();
    });

    $restartButton.addEventListener('click', (e) => {
      new GameConfigView(this.$parentElement);
    });
  }

  renderLog() {
    const $logContainer = document.querySelector('.log');
    $logContainer.innerHTML = this.#log.join('<br>');
    $logContainer.scrollTop = $logContainer.scrollHeight;
  }

  renderRemainChance() {
    const $remainChance = document.querySelector('.remain_chance');
    $remainChance.innerHTML = `남은 횟수: ${this.#game.chance - this.#game.attemptCount}`;
  }

  renderInputLog() {
    const $inputLogContainer = document.querySelector('.input_log');
    $inputLogContainer.innerHTML = `현재까지 입력: ${this.#game.guessLog.join(' ')}`;
  }
}
