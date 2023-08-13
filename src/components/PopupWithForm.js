import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  // Конструктор класса PopupWithForm принимает следующие аргументы:
  // selectorPopup: селектор всплывающего окна
  // submitForm: функция-обработчик отправки формы
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;

    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._popupSaveBtn = this._popup.querySelector('.popup__save-btn');
    this._defaultText = this._popupSaveBtn.textContent;
  }

  // Возвращает значения полей ввода формы в виде объекта
  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  // Устанавливает значения полей ввода формы из переданного объекта данных
  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // Устанавливает обработчики событий для формы и наследует обработчики событий базового класса
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._popupSaveBtn.textContent = 'Сохранение...';
      this._submitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  // Устанавливает текст кнопки сохранения по умолчанию
  setDefaultText() {
    this._popupSaveBtn.textContent = this._defaultText;
  }

  // Закрывает всплывающее окно с формой и сбрасывает значения полей ввода
  close() {
    super.close();
    this._form.reset();
  }
}
