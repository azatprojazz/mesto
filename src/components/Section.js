export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.reverse().forEach((item) => this._renderer(item)); // большое спасибо за подсказку .reverse()
  }
}
