import GamePlayView from './game-play';
import Game from '../../domain/game';

export default class GameConfigView {
  template = /*html*/ `
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

  $parent;

  constructor($parent) {
    this.$parent = $parent;
    this.render();
    this.addEvent();
  }

  render() {
    this.$parent.innerHTML = this.template;
  }

  addEvent() {
    const $gameConfigForm = document.querySelector('.game_config_form');

    $gameConfigForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const min = Number(formData.get('min') ?? '0');
      const max = Number(formData.get('max') ?? '0');
      const chance = Number(formData.get('chance') ?? '0');

      const game = new Game({ min, max, chance });

      new GamePlayView(this.$parent, game);
    });
  }
}
