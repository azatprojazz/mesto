import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;

    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._popupSaveBtn = this._popup.querySelector('.popup__save-btn');
    this._defaultText = this._popupSaveBtn.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._popupSaveBtn.textContent = 'Сохранение...';
      this._submitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  setDefaultText() {
    this._popupSaveBtn.textContent = this._defaultText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
