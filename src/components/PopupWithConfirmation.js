import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  // Конструктор класса PopupWithConfirmation принимает следующие аргументы:
  // selectorPopup: селектор всплывающего окна
  // submitForm: функция-обработчик отправки формы подтверждения
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;

    this._form = this._popup.querySelector('.popup__form');
    this._currentCard = null;
  }

  // Устанавливает обработчики событий для формы подтверждения и наследует обработчики событий базового класса
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._currentCard);
    });
    super.setEventListeners();
  }

  // Открывает всплывающее окно с подтверждением и сохраняет ссылку на текущую карточку
  open(card) {
    this._currentCard = card;
    super.open();
  }
}
