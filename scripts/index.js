import initialCards from './initialCardsData.js';
import { Card } from './card.js';
import config from './config.js';
import FormValidator from './formValidator.js';

// Находим все попапы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
const popupViewCard = document.querySelector('.popup_type_view-card');

// Обращаемся к содержимому template
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
const nameCardInput = formAddCard.querySelector(
  '.popup__input_content_card-name'
);
const linkCardInput = formAddCard.querySelector(
  '.popup__input_content_card-link'
);
const nameInput = formEditProfile.querySelector('.popup__input_content_name');
const jobInput = formEditProfile.querySelector('.popup__input_content_job');

// Находим кнопки
const popupEditBtnElement = document.querySelector('.profile__edit-btn');

// Закрытие попап по кнопке Escape
const handleKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const openModal = document.querySelector('.popup_opened'); //найди мне открытую модалку

    closePopup(openModal); //закрой мне эту модалку
  }
};

const createCard = (item) => {
  const card = new Card(item, '.card-template', handleClickCard);
  const cardElement = card.generateCard();

  return cardElement;
};

/**
 * Пробегаемся по списку массива карточек, создаем карточки
 */
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cardsContainer.prepend(cardElement);
});

/**
 * Создаем класс, закрывающий Popup
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyUp);
}

/**
 * Открываем попапы
 */
function handleClickCard(name, link) {
  popupImageElement.alt = name;
  popupImageElement.src = link;
  popupCaptionElement.textContent = name;
  openPopup(popupViewCard);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyUp);
}

/**
 * Создаем класс, добавляющий Popup, и получаем значение полей jobInput и nameInput из свойства value
 */
function openPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

function openPopupCard() {
  openPopup(popupCards);
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

formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardElement = createCard({
    name: nameCardInput.value,
    link: linkCardInput.value,
  });
  cardsContainer.prepend(cardElement);
  closePopup(popupCards);
  evt.target.reset();
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupEditBtnElement.addEventListener('click', openPopupProfile);
popupCardsOpenBtn.addEventListener('click', openPopupCard);
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-btn')
    ) {
      closePopup(popup);
    }
  });
});
formEditProfile.addEventListener('submit', submitProfileForm);

const forms = document.querySelectorAll(config.formSelector); //находим все формы на странице
forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});
