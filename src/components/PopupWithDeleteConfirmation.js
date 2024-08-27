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


  this._popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    this._handleFormSubmit(this._cardId, this._cardElement);

  });
  
  }
  
  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }
  
  close() {
    super.close();
    
    this._cardId = null;
    this._cardElement = null;
    // this._popupElement.removeEventListener("submit", this._handleDeletePopup);
  }
  
}
