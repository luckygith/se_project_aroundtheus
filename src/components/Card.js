// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
// const cardElement = cardTemplate.cloneNode(true);

export default class Card {
  constructor(cardData,
    cardSelector,
    handleImageClick,
    handleDeleteSubmitPopup,
    handleCardLike,
    checkLikeStatus,
    toggleLikeIcon,
   
  ) {
    this._cardData = cardData;
    
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteSubmitPopup = handleDeleteSubmitPopup;
    this.handleCardLike = handleCardLike;
    this._checkLikeStatus = checkLikeStatus;
    this._toggleLikeIcon = toggleLikeIcon;
    // this._toggleLikeIconDislke = toggleLikeIconDislke;

    
  }

  
  toggleLikeIcon(cardData) {
    
    if (this._likeButton.classList.contains("cards__like-button_active")) {
        this._likeButton.classList.remove("cards__like-button_active");
        console.log(cardData, "is TOGGLED TO unliked and false");
      } else {
          this._likeButton.classList.add("cards__like-button_active");
          console.log(cardData, "is TOGGLED TO liked and true");  
        }}
        
        
        checkLikeStatus(isLiked, cardData) {
          
          if (!isLiked) {
            this._likeButton.classList.remove("cards__like-button_active");
          } else {
            (this._likeButton.classList.add("cards__like-button_active")); 
            console.log("ANOTHER TOGGLE VIA CHECKSTATUS");
            console.log(cardData);
          }
          
        }

  
      
      getId() {
        return this._cardId;
      }
        
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
      
          this._setEventListeners();
          
          return this._element;
        }
      


    _setEventListeners() {
      this._deleteButton.addEventListener("click", () => {
      this._handleDeleteSubmitPopup(this._cardId, this._element);
        console.log(this._cardId, "to delete?");
      });
    
      this._likeButton.addEventListener("click", () => { 
        this.handleCardLike(this._isLiked, this._cardData, this._cardId, this._element, this);    
    
        return this._element;
   
  
     });
  
      this._cardImageElement.addEventListener("click", () =>
        this._handleImageClick({ name: this._name, link: this._link })
      );
    }
  }



    // handleConfirmDeleteSubmit() {
    //   //cardSection.removeItem(cardElement);
    //   this._element.remove();
    //   this._element = null;
    //   console.log("handleConfirmDelete accessed");
    //   console.log(this._cardElement);
      
    //   //deleteCardPopup.close();
    // }
    // _handleDeleteCard() {
    //   this._element.remove();
    //   this._element = null;
    // }

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

  // }

