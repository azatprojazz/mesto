export default class Card {
  constructor(
    data,
    templateSelector,
    userId,
    handleClickCard,
    handleDeleteCard,
    handleLikeClick
  ) {
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

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate(); // возвращает мою li из шаблона template
    this._cardImage = this._element.querySelector('.card__image');
    this._likeCountElement = this._element.querySelector('.card__like-count');
    this._elementRemoveBtn = this._element.querySelector('.card__delete-btn');

    if (this._ownerId !== this._userId) {
      this._elementRemoveBtn.remove();
    }

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._likeCountElement.textContent = this._likes.length;
    this._setEventListeners();
    this._setLikeColor();

    return this._element;
  }

  _setLikeColor() {
    if (this._isLike) {
      this._likeButton.classList.add('card__like_active');
    } else {
      this._likeButton.classList.remove('card__like_active');
    }
  }

  changeLikesCount(numberLike) {
    this._likeCountElement.textContent = numberLike;
  }

  changeLike() {
    this._isLike = !this._isLike;
    this._setLikeColor();
  }

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

  _handleLikeToggle() {
    this._likeButton.classList.toggle('card__like_active');
  }

  handleRemoveClick() {
    this._element.remove();
    this._element = null;
  }
}
