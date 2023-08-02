export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.token = options.headers.authorization
    }

    getInitialCards() {

    }

    getUserInfo() {
        return fetch(this.baseUrl+'cards', {
            headers: {
              authorization: this.token
            }
          })
            .then(res => res.json())
            .then((result) => {
              console.log(result);
            });
    }

    // другие методы работы с API
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72/',
    headers: {
        authorization: 'baec5030-e66a-4791-88f5-1a246d578a5b',
        'Content-Type': 'application/json'
    }
});

api.getUserInfo();