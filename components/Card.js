//this._cardElement = document.querySelector(".cards__list-item");

export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  getView() {
    console.log("GET VIEW IS BEING CALLED");
    //getcard
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-item")
      .cloneNode(true);

    //set eventlistener
    this._setEventListeners();
    //return card
    return this._element;
  }

  _setEventListeners() {
    console.log("SETTING EVENT LISTENERS");
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        console.log("HIT LIKE");
        this._handleLikeIcon();
      });

    this._element
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this.handleImageClick();
      });
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle(".cards__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
