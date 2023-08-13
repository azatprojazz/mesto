export default class Card {
  // Конструктор класса Card принимает следующие аргументы:
  // data: объект с данными карточки (имя, ссылка, лайки, владелец и ID)
  // templateSelector: селектор шаблона карточки
  // userId: ID текущего пользователя
  // handleClickCard: функция-обработчик клика по изображению карточки
  // handleDeleteCard: функция-обработчик удаления карточки
  // handleLikeClick: функция-обработчик клика по лайку карточки
  constructor(data, templateSelector, userId, handleClickCard, handleDeleteCard, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._handleClickCard = handleClickCard;
    this._isLike = this._likes.some((like) => like._id === this._userId);
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
  }

  // Возвращает клонированный шаблон карточки из HTML
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // Генерирует карточку с данными и добавляет обработчики событий
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeCountElement = this._element.querySelector('.card__like-count');
    this._elementRemoveBtn = this._element.querySelector('.card__delete-btn');

    // Удаляет кнопку удаления карточки, если текущий пользователь не является владельцем карточки
    if (this._ownerId !== this._userId) {
      this._elementRemoveBtn.remove();
    }

    // Устанавливает текст и изображение карточки
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._likeCountElement.textContent = this._likes.length;

    // Добавляет обработчики событий
    this._setEventListeners();
    this._setLikeColor();

    return this._element;
  }

  // Устанавливает цвет кнопки лайка в зависимости от состояния лайка
  _setLikeColor() {
    if (this._isLike) {
      this._likeButton.classList.add('card__like_active');
    } else {
      this._likeButton.classList.remove('card__like_active');
    }
  }

  // Изменяет количество лайков карточки
  changeLikesCount(numberLike) {
    this._likeCountElement.textContent = numberLike;
  }

  // Изменяет состояние лайка (добавляет или удаляет лайк)
  changeLike() {
    this._isLike = !this._isLike;
    this._setLikeColor();
  }

  // Устанавливает обработчики событий для кнопок лайка, удаления карточки и клика по изображению карточки
  _setEventListeners() {
    const card = this;
    this._likeButton = this._element.querySelector('.card__like');

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(card);
    });

    this._elementRemoveBtn.addEventListener('click', () => {
      this._handleDeleteCard(card);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleClickCard(this._name, this._link);
    });
  }

  // Удаляет карточку из DOM
  handleRemoveClick() {
    this._element.remove();
    this._element = null;
  }
}
