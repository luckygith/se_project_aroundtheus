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

  //now need to make sure if typed in form and not submitted will clear out when reopened
  //make sure get access to the form itself not the popup

  open() {
    super.open();
  }

  close() {
    //this._popupForm.reset(); //overwrites Popup close()  need form to reset
    super.close(); //after overwriting - but still keep code I want to run from original class
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _getInputValues() {
    const inputValues = {};

    this._popupForm.querySelectorAll(this._inputSelector).forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    //event.preventDefault();
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });

    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
