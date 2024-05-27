// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
// const cardElement = cardTemplate.cloneNode(true);

export default class Card {
  constructor(
    { name, link },
    cardSelector,
    handleImageClick,
    handleDeleteSubmit,
    handleConfirmDeleteSubmit
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteSubmit = handleDeleteSubmit;
    this._handleConfirmDeleteSubmit = handleConfirmDeleteSubmit;

    // this._confirmDeleteButton = this._popupElement.querySelector(
    //   "#confirm-delete-button"
    // );
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("cards__like-button_active");
  };

  // _handleDeleteCardConfirm(event) {
  //   event.preventDefault();
  //   this._handleDeleteCard(confirmDeleteButton);
  //   this.close();
  // }

  // _handleDeleteCard = () => {
  //   this._element.remove();
  //   this._element = null;
  //   console.log("handleDeleteCard clicked");
  // };

  // _handleDeleteSubmit() {
  //   console.log("HI THERE HELLO");
  //   this.delete;
  // }

  getView() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-item")
      .cloneNode(true);

    this._likeButton = this._element.querySelector(".cards__like-button");
    this._deleteButton = this._element.querySelector(".cards__delete-button");
    this._confirmDeleteButton = this._element.querySelector(
      "#confirm-delete-button"
    );

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

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      console.log("delete button on card class was clicked");

      this._handleDeleteSubmit({ name: this._name, link: this._link });
    });

    // this._confirmDeleteButton.addEventListener(
    //   "click",
    //   this._handleConfirmDeleteSubmit(this._cardImageElement)
    // );

    // this._confirmDeleteButton.addEventListener("click", () => {
    //   this._handleConfirmDeleteSubmit();
    // });

    this._likeButton.addEventListener("click", this._handleLikeIcon);

    //this._deleteButton.addEventListener("click", this._handleD;
    //console.log(this._cardImageElement);

    this._cardImageElement.addEventListener("click", () =>
      //********
      this._handleImageClick({ name: this._name, link: this._link })
    );
  }
}
