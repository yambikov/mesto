import { data } from "autoprefixer";

export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.data = options.data;
  }

  // Вспомогательный метод для выполнения fetch-запросов и обработки ответа от сервера
  _makeRequest(url, method, data) {
    const requestOptions = {
      method,
      headers: this.headers,
      ...(data ? { body: JSON.stringify(data) } : {})
    };

    return fetch(`${this.baseUrl}${url}`, requestOptions).then((res) => {
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
    return this._makeRequest('users/me', 'GET'); // возвращает объект {name: 'Marie Skłodowska Curie', about: 'Physicist and Chemist', avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg', _id: 'bba7060593119ffd8fc1af1f', cohort: 'cohort-72'}
  }

  // Изменить информацию о текущем пользователе
  // editUserInfoApi() {
  //   return this._makeRequest('users/me', 'PATCH', {
  //     name: 'Jack London',
  //     about: 'writer'
  //   });

  editUserInfoApi(data) {
    return this._makeRequest('users/me', 'PATCH', data);

  }
}


//////////////



