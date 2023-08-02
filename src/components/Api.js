export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.token = options.headers.authorization
    }



    getInitialCards() {
        return fetch(this.baseUrl+'cards', {
            headers: {
              authorization: this.token
            }
          })
            .then(res => res.json());
    }

    // другие методы работы с API
}