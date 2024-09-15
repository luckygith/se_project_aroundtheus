import Popup from "./Popup.js";
import { config } from "../utils/utils.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputSelector = config.inputSelector;

    this._submitButton = this._popupElement.querySelector(".modal__button");

    this._defaultButtonText = this._submitButton.textContent = "Saveee"
    
    //this._submitButtonSelector = config.submitButtonSelector;
    //this._submitButtonSelector.textContent = savingProcess;
  }

  // this._modalImage.src = link;

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

  submitButtonLoadingState(isLoading) {
    
      if (this._submitButton) {
        this._submitButton.textContent = isLoading
          ? this._defaultButtonText
          : "Saving...";
      }

  }



  _handleFormSubmit(event) {
    event.preventDefault();
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
    this.close();
  }
}

