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
            .then((res) => { // Мне кажется в этом коде что-то полезное есть. Берём все карточки, находим у них массив с лайками. Там объекст с идом
                JSON.stringify(res);
                res.forEach((itm) => {
                    itm.likes.forEach((like) => {
                        const info = this.getInitialsInfo();
                        info.then((res) => {
                            if(res._id == like._id){
                                console.log(res._id);
                            }
                        })
                        
                    })
                })
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

    postCard (title, link) {
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
    }

    _checkAnswerState (res) {
        if (res.ok) {
          console.log("Everything is good!");
          return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`);
      };



    handleLike (id, isLiked) {
        if(isLiked) {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                // console.log("like removed");
            })
        } else {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                // console.log("like added");
            })
        }
    }
      // fetch(`https://mesto.nomoreparties.co/v1/cohort-17/cards/likes/5fa29ee7fca8c000111d9178`, {
//     method: 'PUT',
//     headers: {
//         authorization: '16bbf0d2-da12-4d9c-809d-74b46ac64585',
//         'Content-Type': 'application/json'
//     },
// })
//     .then((res) => {
//         console.log(res);
//     })
    // другие методы работы с API
}