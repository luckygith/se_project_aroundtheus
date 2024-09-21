export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    //this.cardId = cardElement.cardId;

  }

checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

  //USER ROUTES

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {  
      headers: this.headers,
    }).then(this.checkResponse);
  }
 
//PROFILE

  editProfile({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this.checkResponse);
  }

  editProfileAvatar({avatar}) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
      avatar: avatar,
      })
    }).then(this.checkResponse);
  }

  //CARDS


  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  addingNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this.checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
    .then(this.checkResponse);

  }

isLikeCard(cardId) {
  return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: this.headers,
  })
  .then(this.checkResponse);
}


addLikeState(cardId) {
  
  return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: this.headers,
  })
  .then(this.checkResponse);

}

removeLikeState(cardId) {
  
  return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: this.headers,
  })
  .then(this.checkResponse);

}


}
