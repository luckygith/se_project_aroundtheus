const profileEditModal = document.querySelector("#profile-edit-modal"); //instead of using identical yet confusing paired class names we create an id
const previewImageModal = document.querySelector("#preview-image-modal");
const addNewCardModal = document.querySelector("#add-card-modal");
//this._cardImageElement = this._cardElement.querySelector(".cards__image");

const modals = [profileEditModal, previewImageModal, addNewCardModal];

export default class Card {
  //instantiating / make copy of card class to inner index.js
  constructor(cardData, cardSelector, handleImageClick) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._name = cardData.name;
    this._link = cardData.link;
    //this._cardSelector = cardSelector;
    //this._handleImageClick = handleImageClick;
  }



  _setEventListeners() {
    const likeButton = this._cardElement
      .querySelector(".cards__like-button");
      //.addEventListener("click", () => {
        //this._handleLikeIcon();
        console.log(likeButton);
      };

    //this._cardElement
      //.querySelector(".cards__delete-button")
      //.addEventListener("click", () => {
        //this._handleDeleteCard();
      //});

    this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  //methods of class Card


    _handleLikeIcon() {
      this._cardElement
        .querySelector(".cards__like-button")
        .classList.toggle("cards__like-button_active");
    //this._likeButton.addEventListener("click", () => {
    //likeButton.classList.toggle("card__like-button-active");
  }


_handleDeleteCard() {
this._cardElement.remove();
this._cardElement = null}

getView() {
    //cloned card is assigned to cardElement
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-item")
      .cloneNode(true);

    this._cardImageElement = this._cardElement.querySelector(".cards__image");
    this._setEventListeners();

    return this._cardElement;
    //get card view, set event listeners, return card
  }