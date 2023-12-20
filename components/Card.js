// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
// const cardElement = cardTemplate.cloneNode(true);

class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    //this._cardElement = this._getCardElement();
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // this._likeButton.addEventListener("click", () => {
    //   this._handleLikeIcon();
    // });

    // this._deleteButton.addEventListener("click", () => {
    //   this._handleDeleteCard();
    // });

    this._likeButton.addEventListener("click", this._handleLikeIcon);

    this._deleteButton.addEventListener("click", this._handleDeleteCard);

    this._cardImageElement.addEventListener("click", this._handleImageClick);
  }

  // _handleLikeIcon() {
  //   this._likeButton.classList.toggle(".cards__like-button_active");
  // }

  // _handleDeleteCard() {
  //   this._element.remove();
  //   this._element = null;
  // }

  _handleLikeIcon = () => {
    console.log("handle like icon function on");
    this._likeButton.classList.toggle("cards__like-button_active");
  };

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  getView() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-item")
      .cloneNode(true);

    this._likeButton = this._element.querySelector(".cards__like-button");
    this._deleteButton = this._element.querySelector(".cards__delete-button");

    this._cardTitleElement = this._element.querySelector(".cards__title");
    this._cardImageElement = this._element.querySelector(".cards__image");

    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    // fill this._element with the data: name, link<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    //set eventlistene
    this._setEventListeners();
    //return card
    return this._element;
  }
}
export default Card;
