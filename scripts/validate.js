const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`); //мы находим объект ошибки, который связан с этим инпутом, чтобы писать в него, или очищать из него ошибку

  if (input.validity.valid) {
    //и проверяем, если текущий инпут валиден
    //убрать ошибку
    error.textContent = ''; //значит ошибка не нужна, нужно просто очистить
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
    error.textContent = input.validationMessage; //если не валиден, значит ошибку нужно показать
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }
};

const toggleButtonInvalid = (inputs, button, config) => {
  const isFormValid = inputs.every((input) => input.validity.valid); //если инпут валиден на каждой итерации внутри массива, то тогда вся конструкция вернет true, и переменная будет true. Если хотя бы один из инпутов, одна из итераций вернет мне false, input.validity.valid, то тогда вся конструкция inputs.every будет false

  if (isFormValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
};

const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)]; //находим все формы на странице

  forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(config.inputSelector)]; //в каждой форме нашли все инпуты
    const button = form.querySelector(config.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        //на каждый инпут подписались, что когда в нем будут изменения, любой клик

        // 1. показать ошибку
        checkInputValidity(input, config);

        // 2. задизайблить кнопку
        toggleButtonInvalid(inputs, button, config);
      });
    });
  });
};

enableValidation(config);