import Popup from "./Popup.js";
import { config } from "../utils/utils.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputSelector = config.inputSelector;

    this._submitButtonSelector = this._popupElement.querySelector(
      config.submitButtonSelector
    );

    this._defaultButtonText = this._submitButtonSelector.textContent = "Save";
  }

  open() {
    super.open();
    this._popupForm.addEventListener("submit", this._handleFormSubmitMethod);
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleFormSubmitMethod);
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
    if (this._submitButtonSelector) {
      this._submitButtonSelector.textContent = isLoading
        ? this._defaultButtonText
        : "Saving...";
    }
  }

  _handleFormSubmitMethod = (event) => {
    event.preventDefault();
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };
}
