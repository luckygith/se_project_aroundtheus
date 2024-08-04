import Popup from "./Popup";
import { config } from "../utils/utils";

export default class PopupWithDeleteConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButtonSelector = config.submitButtonSelector;
    this._handleFormSubmit = handleFormSubmit;

  }


  setEventListeners() {
  
  //   this._popupForm.addEventListener("submit", (evt) => {
  //     evt.preventDefault();
  //     this._handleFormSubmit(
  //       this._cardId, this._cardElement 
  //     );
  //   }
  // );
  

  this._popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    console.log("POPUPWITHCLASS IS THIS EVENTLISTENER");
    this._handleFormSubmit(cardId, cardElement);
    console.log(this._handleFormSubmit);
  });
  
  }
  
  open(cardId, cardElement) {
    super.open();
    // this._cardId = cardId;
    // this._cardElement = cardElement;
    console.log("popupWithDeleteConfirmation accessed!");
    console.log(cardId);
  }
  
  close() {
    super.close();
    this._cardId = null;
    this._cardElement = null;
    console.log("popupclosedviapopupWithDeleteConfirm");
    console.log(cardElement);
    // this._popupElement.removeEventListener("submit", this._handleDeleteSubmit);
  }
  
}
