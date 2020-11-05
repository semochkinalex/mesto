export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._token = config.token;
        this._headers = config.headers;
    }



    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token,
            }
        })
            .then((res) => {
                return res.json()       // Make a function that does this.
            })
            .then((res) => {
                JSON.stringify(res);
                return res;
            })
    }

    getInitialsInfo () {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
            },
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            JSON.stringify(res);
            return res;
        })
    }

    _checkAnswerState (res) {
        if (res.ok) {
          console.log("Everything is good!");
          return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`);
      };
    // другие методы работы с API
}