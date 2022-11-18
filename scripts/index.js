// Находим форму в DOM
const popupElement = document.querySelector('.popup');

// let formElement = // Воспользуйтесь методом querySelector()
const formElement = popupElement.querySelector('.popup__form');

// // Находим поля формы в DOM
const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__job');

// let nameInput = // Воспользуйтесь инструментом .querySelector()
const nameInput = formElement.querySelector('[name="name"]');

// let jobInput = // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('[name="job"]');

const popupEditBtnElement = document.querySelector('.profile__edit-btn');
const popupCloseBtnElement = popupElement.querySelector('.popup__close-btn');

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

// Получите значение полей jobInput и nameInput из свойства value
function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// Так мы можем определить свою логику отправки.
// О том, как это делать, расскажем позже.
function formSubmitHandler(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup();
}

// // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupEditBtnElement.addEventListener('click', openPopup);
popupCloseBtnElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
