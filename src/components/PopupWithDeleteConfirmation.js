import Popup from "./Popup";
import { config } from "../utils/utils";

export default class PopupWithDeleteConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButtonSelector = config.submitButtonSelector;
    this._handleFormSubmit = handleFormSubmit

  }
  //   this._submitButtonSelector = this._element.querySelector(".modal__button");
  // }

  setEventListeners() {
    super.setEventListeners();
 
    this._form.addEventListeners("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardElement);
     // console.log(this._popupForm);
    }
);

  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
    //  this._popupElement.addEventListener("click", this._handleDeleteSubmit);
  }

  close() {
    super.close();
    this._cardId = null;
    this._cardElement = null;
    // this._popupElement.removeEventListener("submit", this._handleDeleteSubmit);
  }

}
