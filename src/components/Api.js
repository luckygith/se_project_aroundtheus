export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // _request(url, options) {
  //   return this._request(url, options);
  // }

  _request(url, options) {
    return fetch(url, options).then(this.checkResponse);
  }

  //USER ROUTES

  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, { headers: this.headers });
  }
  //PROFILE

  editProfile({ name, about }) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  editProfileAvatar({ avatar }) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  //CARDS

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    });
  }

  addingNewCard({ name, link }) {
    return this._request(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  isLikeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  addLikeState(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  removeLikeState(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}
