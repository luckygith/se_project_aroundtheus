// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
// const cardElement = cardTemplate.cloneNode(true);

export default class Card {
  constructor(cardData,
    cardSelector,
    handleImageClick,
    handleDeleteSubmit,
  ) {
    this._cardData = cardData;
    
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteSubmit = handleDeleteSubmit;

    // this._confirmDeleteButton = this._popupElement.querySelector(
    //   "#confirm-delete-button"
    // );
  }

  getId() {
    return this._id;
  }
  
  handleConfirmDeleteSubmit() {
    //cardSection.removeItem(cardElement);
    this._element.remove();
    this._element = null;
    console.log("handleConfirmDelete accessed");
    console.log(cardData);
    //deleteCardPopup.close();
  }
  // _handleDeleteCard() {
  //   this._element.remove();
  //   this._element = null;
  // }

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
    // this._confirmDeleteButton = this._element.querySelector(
    //   "#confirm-delete-button"
    // );

    this._cardTitleElement = this._element.querySelector(".cards__title");
    this._cardImageElement = this._element.querySelector(".cards__image");

    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteSubmit(this.getId(), this._element);
      console.log("delete button on card class was clicked");
      console.log(this._cardData);
    });
  
    this._likeButton.addEventListener("click", this._handleLikeIcon);

    this._cardImageElement.addEventListener("click", () =>
   
      this._handleImageClick({ name: this._name, link: this._link })
    );
  }
}
