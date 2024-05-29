import GameConfigView from './game-config';

export default class App {
  template = /*html*/ `
    <h1>숫자 업&다운 Game</h1>
    <container class="container"></container>
  `;

  $parentElement;

  constructor($parentElement) {
    this.$parentElement = $parentElement;
    this.render();

    // 초기에는 GameConfigComponent
    const $container = document.querySelector('.container');
    new GameConfigView($container);
  }

  render() {
    this.$parentElement.innerHTML = this.template;
  }
}
