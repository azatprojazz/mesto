class Card {
  constructor(data, templateSelector, handleClickCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleClickCard = handleClickCard;
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

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like');

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element
      .querySelector('.card__delete-btn')
      .addEventListener('click', () => {
        this._handleRemoveClick();
      });

    this._cardImage.addEventListener('click', () => {
      this._handleClickCard(this._name, this._link);
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('card__like_active');
  }

  _handleRemoveClick() {
    this._element.remove();
    this._element = null;
  }
}

export { Card };
