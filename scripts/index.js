import initialCards from './constants.js';

// Находим все попапы
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
const popupViewCard = document.querySelector('.popup_type_view-card');

// Обращаемся к содержимому template
const cardTemplate = document.querySelector('.card-template').content;
const cardsContainer = document.querySelector('.cards__container');

// Находим формы в DOM
const formEditProfile = popupProfile.querySelector('.popup__form');
const formAddCard = popupCards.querySelector('.popup__form');

// Вытаскиваем элементы из DOM для добавления карточек
const popupCardsOpenBtn = document.querySelector('.profile__add-btn');
const popupImageElement = popupViewCard.querySelector('.popup__image');
const popupCaptionElement = popupViewCard.querySelector('.popup__caption');

// Находим поля формы в DOM
const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__job');
const nameCardInput = formAddCard.querySelector('.popup__input_content_card-name');
const linkCardInput = formAddCard.querySelector('.popup__input_content_card-link');
const nameInput = formEditProfile.querySelector('.popup__input_content_name');
const jobInput = formEditProfile.querySelector('.popup__input_content_job');

// Находим кнопки
const popupEditBtnElement = document.querySelector('.profile__edit-btn');
const popupCloseBtnProfile = popupProfile.querySelector('.popup__close-btn');
const popupCloseBtnCards = popupCards.querySelector('.popup__close-btn');
const popupCloseBtnViewCard = popupViewCard.querySelector('.popup__close-btn');

function createCard(cardName, cardLink) {
  // Вытащил из темплейта элемент списка
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  cardTitleElement.textContent = cardName;
  cardImageElement.alt = cardName;
  cardImageElement.src = cardLink;
  const likeBtn = cardElement.querySelector('.card__like');
  const deleteBtn = cardElement.querySelector('.card__delete-btn');
  cardImageElement.addEventListener('click', () => {
    popupImageElement.alt = cardName;
    popupImageElement.src = cardLink;
    popupCaptionElement.textContent = cardName;
    openPopup(popupViewCard);
  });
  likeBtn.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });
  deleteBtn.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
    console.log(evt.target);
  });
  return cardElement;
}

/**
 * Добавляем карточки
 */
function prependCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

/**
 * Пробегаемся по списку массива карточек, создаем карточки
 */
initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  prependCard(card);
});

/**
 * Создаем класс, закрывающий Popup
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/**
 * Открываем попапы
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/**
 * Создаем класс, добавляющий Popup, и получаем значение полей jobInput и nameInput из свойства value
 */
function openPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

/**
 * Обработчик «отправки» формы, хотя пока она никуда отправляться не будет, так мы можем определить свою логику отправки.
 */
function submitProfileForm(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(popupProfile);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const card = createCard(nameCardInput.value, linkCardInput.value);
  prependCard(card);
  formAddCard.reset();
  closePopup(popupCards);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupEditBtnElement.addEventListener('click', openPopupProfile);
popupCardsOpenBtn.addEventListener('click', () => {
  openPopup(popupCards);
});
popupCloseBtnProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});
popupCloseBtnCards.addEventListener('click', () => {
  closePopup(popupCards);
});
popupCloseBtnViewCard.addEventListener('click', () => {
  closePopup(popupViewCard);
});
formEditProfile.addEventListener('submit', submitProfileForm);
formAddCard.addEventListener('submit', submitCardForm);
