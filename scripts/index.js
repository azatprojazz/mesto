/** Находим форму в DOM, воспользуйтесь методом querySelector() */
const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.popup__form');
/** Находим поля формы в DOM */
const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__job');
const nameInput = formElement.querySelector('#input-name');
const jobInput = formElement.querySelector('#input-job');
const popupEditBtnElement = document.querySelector('.profile__edit-btn');
const popupCloseBtnElement = popupElement.querySelector('.popup__close-btn');

/**
 * Создаем класс, закрывающий Popup
 */
function closePopup() {
  popupElement.classList.remove('popup_opened');
}

/**
 * Создаем класс, добавляющий Popup, и получаем значение полей jobInput и nameInput из свойства value
 */
function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

/**
 * Обработчик «отправки» формы, хотя пока она никуда отправляться не будет, так мы можем определить свою логику отправки.
 */
function submitForm(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupEditBtnElement.addEventListener('click', openPopup);
popupCloseBtnElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', submitForm);
