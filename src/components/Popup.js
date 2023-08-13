export default class Popup {
  // Конструктор класса Popup принимает следующий аргумент:
  // selectorPopup: селектор всплывающего окна
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);

    // Привязываем контекст, чтобы можно было передавать _handleEscClose как обработчик событий
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Открывает всплывающее окно и добавляет обработчик закрытия по нажатию на клавишу Escape
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрывает всплывающее окно и удаляет обработчик закрытия по нажатию на клавишу Escape
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Обрабатывает закрытие всплывающего окна по нажатию на клавишу Escape
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Устанавливает обработчики событий для закрытия всплывающего окна по клику на оверлей или кнопку закрытия
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
  }
}
