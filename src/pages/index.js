import './index.css'; // Файл стилей

import Card from '../components/Card.js';
import config from '../utils/config.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { api } from '../components/Api.js';

const popupCardsOpenBtn = document.querySelector('.profile__add-btn');
const popupEditBtnElement = document.querySelector('.profile__edit-btn');
const popupAvatarOpenBtn = document.querySelector('.profile__edit-image');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    userInfo.setUserInfo(res[0]);
    cardSection.renderItems(res[1]);
  })
  .catch((err) => {
    console.log(err);
  });

const popupProfile = new PopupWithForm(
  '.popup_type_profile',
  submitProfileForm
);
popupProfile.setEventListeners();

const popupCards = new PopupWithForm('.popup_type_cards', submitAddCard);
popupCards.setEventListeners();

const popupViewCard = new PopupWithImage('.popup_type_view-card');
popupViewCard.setEventListeners();

const popupConfirm = new PopupWithConfirmation(
  '.popup_remove',
  handleDeleteCard
);
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_avatar', submitAvatarForm);
popupAvatar.setEventListeners();

const createCard = (item) => {
  const userId = userInfo.getId();
  const card = new Card(
    item,
    '.card-template',
    userId,
    handleClickCard,
    openPopupConfirm,
    handleLikeClick
  );
  const cardElement = card.generateCard();

  return cardElement;
};

const cardSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  '.cards__container'
);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar',
});

/**
 * Открываем попапы
 */
function handleClickCard(name, link) {
  popupViewCard.open(name, link);
}

function handleDeleteCard(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      card.handleRemoveClick();
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function openPopupConfirm(card) {
  popupConfirm.open(card);
}

function handleLikeClick(card) {
  const method = card._isLike ? 'DELETE' : 'PUT';
  api
    .addLikeCard(card._id, method)
    .then((res) => {
      card.changeLike();
      card.changeLikesCount(res.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Создаем класс, добавляющий Popup, и получаем значение полей jobInput и nameInput из свойства value
 */
function openPopupProfile() {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
}

function openPopupCard() {
  popupCards.open();
}

function openAvatar() {
  popupAvatar.open();
}

function submitAvatarForm(avatar) {
  api
    .setNewAvatar(avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.setDefaultText();
    });
}

/**
 * Обработчик «отправки» формы, хотя пока она никуда отправляться не будет, так мы можем определить свою логику отправки.
 */
function submitProfileForm(inputValues) {
  // Эта строчка отменяет стандартную отправку формы.
  api
    .editUserInfo(inputValues)
    .then((inputValues) => {
      userInfo.setUserInfo(inputValues);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.setDefaultText();
    });
}

function submitAddCard(inputValues) {
  api
    .addNewCard(inputValues)
    .then((res) => {
      const cardElement = createCard(res);
      cardSection.addItem(cardElement);
      popupCards.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCards.setDefaultText();
    });
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupEditBtnElement.addEventListener('click', openPopupProfile);
popupCardsOpenBtn.addEventListener('click', openPopupCard);
popupAvatarOpenBtn.addEventListener('click', openAvatar);

const forms = document.querySelectorAll(config.formSelector); //находим все формы на странице
forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});
