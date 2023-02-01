export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = form;
  }

  _checkInputValidity(input) {
    this._error = document.querySelector(`#${input.id}-error`); //мы находим объект ошибки, который связан с этим инпутом, чтобы писать в него, или очищать из него ошибку

    if (input.validity.valid) {
      //и проверяем, если текущий инпут валиден
      //убрать ошибку
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _hideError(input) {
    this._error.textContent = ''; //значит ошибка не нужна, нужно просто очистить
    this._error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _showError(input) {
    // и проверяем, если текущий инпут валиден
    // убрать ошибку
    this._error.textContent = input.validationMessage; //если не валиден, значит ошибку нужно показать
    this._error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _toggleButtonInvalid() {
    const isFormValid = this._inputs.every((input) => input.validity.valid); //если инпут валиден на каждой итерации внутри массива, то тогда вся конструкция вернет true, и переменная будет true. Если хотя бы один из инпутов, одна из итераций вернет мне false, input.validity.valid, то тогда вся конструкция inputs.every будет false

    if (isFormValid) {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    }
  }

  _resetValidation() {
    this._toggleButtonInvalid();

    this._inputs.forEach((input) => {
      this._hideError(input);
    });
  }

  enableValidation() {
    this._inputs = [...this._formElement.querySelectorAll(this._inputSelector)]; //в каждой форме нашли все инпуты
    this._button = this._formElement.querySelector(this._submitButtonSelector);

    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonInvalid();

    this._formElement.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        this._toggleButtonInvalid();
        this._resetValidation();
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        //на каждый инпут подписались, что когда в нем будут изменения, любой клик

        // 1. показать ошибку
        this._checkInputValidity(input);

        // 2. задизайблить кнопку
        this._toggleButtonInvalid();
      });
    });
  }
}
