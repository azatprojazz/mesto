class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _response(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._response(res);
    });
  }

  editUserInfo(inputValues) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(inputValues),
    }).then((res) => {
      return this._response(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._response(res);
    });
  }

  addNewCard(inputValues) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(inputValues),
    }).then((res) => {
      return this._response(res);
    });
  }

  setNewAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then((res) => {
      return this._response(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._response(res);
    });
  }

  addLikeCard(cardId, method) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    }).then((res) => {
      return this._response(res);
    });
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._response(res);
    });
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '7263adae-3071-416f-9c3c-e2fe3a770300',
    'Content-Type': 'application/json',
  },
});
