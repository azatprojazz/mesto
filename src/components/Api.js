class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Обрабатывает ответ от сервера
  // Если ответ успешный (с кодом статуса 200-299), преобразует его в JSON
  // В противном случае возвращает отклоненный промис с сообщением об ошибке
  _response(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // Выполняет запрос к серверу
  // Принимает три аргумента:
  // 1. endpoint: строка, содержащая конечную точку (путь) API
  // 2. method: строка, содержащая HTTP-метод (например, 'GET', 'POST', 'PATCH', 'DELETE'), по умолчанию 'GET'
  // 3. body: объект с данными, которые будут отправлены в теле запроса (если это применимо, например, для 'POST' и 'PATCH' запросов)
  _request(endpoint, method = 'GET', body = null) {
    const options = {
      method,
      headers: this._headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${endpoint}`, options).then((res) => {
      return this._response(res);
    });
  }

  // Получает информацию о пользователе
  getUserInfo() {
    return this._request('/users/me');
  }

  // Редактирует информацию о пользователе
  editUserInfo(inputValues) {
    return this._request('/users/me', 'PATCH', inputValues);
  }

  // Получает начальные карточки
  getInitialCards() {
    return this._request('/cards');
  }

  // Добавляет новую карточку
  addNewCard(inputValues) {
    return this._request('/cards', 'POST', inputValues);
  }

  // Устанавливает новый аватар
  setNewAvatar(avatar) {
    return this._request('/users/me/avatar', 'PATCH', avatar);
  }

  // Удаляет карточку
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, 'DELETE');
  }

  // Добавляет лайк карточке
  addLikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, 'PUT');
  }

  // Удаляет лайк с карточки
  deleteLikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, 'DELETE');
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '7263adae-3071-416f-9c3c-e2fe3a770300',
    'Content-Type': 'application/json',
  },
});
