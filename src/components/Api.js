import { data } from "autoprefixer";

export default class Api {
  constructor(options, cardId) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.data = options;
    this.cardId = cardId;
  }

  // Вспомогательный метод для выполнения fetch-запросов и обработки ответа от сервера
  _makeRequest(url, method, data) {
    const requestOptions = {
      method,
      headers: this.headers,
      ...(data ? { body: JSON.stringify(data) } : {})
    };

    return fetch(`${this.baseUrl}${url}`, requestOptions)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // Получить список начальных карточек
  getInitialCards() {
    return this._makeRequest('cards', 'GET'); // возвращает массив карточек
  }

  // Получить информацию о текущем пользователе
  getUserInfoApi() {
    return this._makeRequest('users/me', 'GET'); // возвращает объект с именем, должностью и проч.
  }

  // Изменить информацию о текущем пользователе
  patchUserInfo(data) {
    return this._makeRequest('users/me', 'PATCH', data);
  }

  postCard(data) {
    return this._makeRequest('cards', 'POST', data);
  }

  deleteCard(cardId) {
    return this._makeRequest(`cards/${cardId}`, 'DELETE');
  }

  putLike(cardId) {
    return this._makeRequest(`cards/${cardId}/likes`, 'PUT');
  }

  deleteLike(cardId) {
    return this._makeRequest(`cards/${cardId}/likes`, 'DELETE');
  }

  patchAvatar(data) {
    return this._makeRequest(`users/me/avatar`, 'PATCH', data);
  }

}


