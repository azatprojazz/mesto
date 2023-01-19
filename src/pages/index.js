import './index.css'; // Файл стилей

import initialCards from '../utils/initialCardsData.js';
import Card from '../components/Card.js';
import config from '../utils/config.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupCardsOpenBtn = document.querySelector('.profile__add-btn');
const nameInput = document.querySelector('.popup__input_content_name');
const jobInput = document.querySelector('.popup__input_content_job');
const popupEditBtnElement = document.querySelector('.profile__edit-btn');

const popupProfile = new PopupWithForm(
  '.popup_type_profile',
  submitProfileForm
);
popupProfile.setEventListeners();

const popupCards = new PopupWithForm('.popup_type_cards', submitAddCard);
popupCards.setEventListeners();

const popupViewCard = new PopupWithImage('.popup_type_view-card');
popupViewCard.setEventListeners();

const createCard = (item) => {
  const card = new Card(item, '.card-template', handleClickCard);
  const cardElement = card.generateCard();

  return cardElement;
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  '.cards__container'
);
cardSection.renderItems();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});

/**
 * Открываем попапы
 */
function handleClickCard(name, link) {
  popupViewCard.open(name, link);
}

/**
 * Создаем класс, добавляющий Popup, и получаем значение полей jobInput и nameInput из свойства value
 */
function openPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupProfile.open();
}

function openPopupCard() {
  popupCards.open();
}

/**
 * Обработчик «отправки» формы, хотя пока она никуда отправляться не будет, так мы можем определить свою логику отправки.
 */
function submitProfileForm(evt, inputValues) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  userInfo.setUserInfo(inputValues);
  popupProfile.close();
}

function submitAddCard(evt, inputValues) {
  evt.preventDefault();
  const cardElement = createCard({
    name: inputValues.name,
    link: inputValues.link,
  });
  cardSection.addItem(cardElement);
  popupCards.close();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupEditBtnElement.addEventListener('click', openPopupProfile);
popupCardsOpenBtn.addEventListener('click', openPopupCard);

const forms = document.querySelectorAll(config.formSelector); //находим все формы на странице
forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});
