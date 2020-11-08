export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._token = config.token;
    this._headers = config.headers;
  }

  // Получает первоначальные карточки

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then(res => {
        return this._handleOriginalResponse(res);
      })
      .catch(res => {
        console.log(res);
      });
  }

  // Получиает информацию

  getInitialsInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
      .then(res => {
        return this._handleOriginalResponse(res);
      })
      .then(res => {
        return res;
      })
      .catch(res => {
        console.log(res);
      });
  }

  // Patching profile

  postProfile(name, job) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).catch(res => {
      console.log(res);
    });
  }

  // Patching the avatar

  postAvatar(avatarInput) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarInput,
      }),
    }).catch(res => {
      console.log(res);
    });
  }

  handleLike(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }).catch(res => {
        console.log(res);
      });
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }).catch(res => {
        console.log(res);
      });
    }
  }

  // Удалить карточку

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).catch(res => {
      console.log(res);
    });
  }

  // Добавить карточку

  postCard(title, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    })
      .then(res => {
        return this._handleOriginalResponse(res);
      })
      .catch(res => {
        console.log(res);
      });
  }

  _handleOriginalResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }
}
