import initialCards from './initialCardsData.js';
import Card from './Card.js';
import config from './config.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// Вытаскиваем элементы из DOM для добавления карточек
const popupCardsOpenBtn = document.querySelector('.profile__add-btn');

const nameInput = document.querySelector('.popup__input_content_name');
const jobInput = document.querySelector('.popup__input_content_job');

// Находим кнопки
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
  // console.log(popupCards._getInputValues())
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
