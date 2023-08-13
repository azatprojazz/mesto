export default class FormValidator {
  // Конструктор класса FormValidator принимает следующие аргументы:
  // config: объект с конфигурацией для валидации формы
  // form: элемент формы, который будет проверяться
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = form;
  }

  // Проверяет валидность текущего инпута и показывает/скрывает ошибку
  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  // Скрывает ошибку для заданного инпута
  _hideError(input) {
    this._error = document.querySelector(`#${input.id}-error`);
    this._error.textContent = '';
    this._error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  // Показывает ошибку для заданного инпута
  _showError(input) {
    this._error = document.querySelector(`#${input.id}-error`);
    this._error.textContent = input.validationMessage;
    this._error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  // Активирует или деактивирует кнопку отправки формы в зависимости от валидности формы
  _toggleButtonInvalid() {
    const isFormValid = this._inputs.every((input) => input.validity.valid);

    if (isFormValid) {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    }
  }

  // Сбрасывает валидацию формы
  _resetValidation() {
    this._toggleButtonInvalid();
    this._inputs.forEach((input) => {
      this._hideError(input);
    });
  }

  // Включает валидацию формы и добавляет обработчики событий
  enableValidation() {
    this._inputs = [...this._formElement.querySelectorAll(this._inputSelector)];
    this._button = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonInvalid();

    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._resetValidation();
      }, 0);
    });

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonInvalid();
      });
    });
  }
}
