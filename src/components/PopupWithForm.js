import Popup from "./Popup.js";
import { config } from "../utils/utils.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    //this._submitButton = this._element.querySelector(".modal__button");
  }

  open() {
    super.open();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
    this._popupForm.reset();
  }
  _getInputValues() {
    const inputValues = {};

    this._popupForm.querySelectorAll(this._inputSelector).forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
    this.close();
  }
}

//REMOVED and utilized using the validator class
// _disableButton() {
//   this._submitButton.classList.add(this._inactiveButtonClass);
//   this._submitButton.disabled = true;
// }

// _enableButton() {
//   this._submitButton.classList.remove(this._inactiveButtonClass);
//   this._submitButton.disabled = false;
// }
