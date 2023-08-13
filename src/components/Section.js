export default class Section {
  // Конструктор класса Section принимает следующие аргументы:
  // { renderer }: объект с функцией-рендерером для отображения элементов
  // selector: селектор контейнера, в котором будут отображаться элементы
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  // Добавляет элемент в начало контейнера
  addItem(element) {
    this._container.prepend(element);
  }

  // Отображает элементы с помощью функции-рендерера в обратном порядке (сначала последний элемент)
  renderItems(items) {
    items.reverse().forEach((item) => this._renderer(item));
  }
}
