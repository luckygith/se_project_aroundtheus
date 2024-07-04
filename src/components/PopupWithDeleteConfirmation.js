import Popup from "./Popup";
import { config } from "../utils/utils";

export default class PopupWithDeleteConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButtonSelector = config.submitButtonSelector;
    this._handleFormSubmit = handleFormSubmit

    console.log("Popup form element:", this._popupForm);

  }
  //   this._submitButtonSelector = this._element.querySelector(".modal__button");
  // }

  setEventListeners() {

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("helllooooo");
      this._handleFormSubmit(
        this._cardId, this._cardElement
      );
     // console.log(this._popupForm);
    }
);

  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
    console.log(cardId);
    //  this._popupElement.addEventListener("click", this._handleDeleteSubmit);
  }

  close() {
    super.close();
    this._cardId = null;
    this._cardElement = null;
    // this._popupElement.removeEventListener("submit", this._handleDeleteSubmit);
  }

}
