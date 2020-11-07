export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._token = config.token;
        this._headers = config.headers;
        this._checkResult = this._checkResult.bind(this);
    }

    // Получает первоначальные карточки

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

    // Получиает информацию

    getInitialsInfo() {
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

    // Patching profile

    postProfile(name, job) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: job,
            })
        })
    }

    // Patching the avatar

    postAvatar(avatarInput) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarInput,
            })
        });
    }

    handleLike(id, isLiked) {
        if (!isLiked) {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json',
                }
            })
        } else {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json',
                }
            })
        }
    }

    // Удалить карточку

    deleteCard (id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
        .then((res) => {
            console.log(res);
        })
    }

    // Добавить карточку

    postCard(title, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                link: link,
            })
        })
            .then((res) => {
                return res.json();
            })
            .catch((res) => {
                console.log(res);
            });
    }

    // Дополнительные функции 

    _checkResult(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    };
}