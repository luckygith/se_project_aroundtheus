export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  //USER ROUTES
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to get user info");
      }
    });
  }

  editProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to edit profile");
      }
    });
  }

  //CARDS

  // https://around-api.en.tripleten-services.com/v1/users/me
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to get initial cards");
      }
    });
  }

  addingNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to add new card");
      }
    });
  }
}
