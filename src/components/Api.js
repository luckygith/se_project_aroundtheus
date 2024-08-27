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

  //const userinfo = JSON.parse(JSON.stringify(user));

 
  editProfile({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    }).then(this.checkResponse);
  }

  // editProfileAvatar({name, about}) {
  //   return fetch(`${this.baseUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: this.headers,
  //     body: JSON.stringify({
  //       name: name,
  //       about: about
  //     })
  //   }).then(this.checkResponse);
  // }

  //CARDS

  // https://around-api.en.tripleten-services.com/v1/users/me
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

  deleteCard(cardId, cardData) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
      //body: JSON.stringify()
    })
    .then(this.checkResponse);

  }
}
