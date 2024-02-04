export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._element = formElement;
  } //excluding formselector since it will be a second argument

  _setEventListeners() {
    this._submitButton = this._element.querySelector(".modal__button");
    this._inputElements = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );
    // this._submitButton = submitButton;
    // this._inputElements = inputElements;

    this._disableButton();

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  resetValidation() {
    this.toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _showInputError(inputElement, errorMessage) {
    // const inputElement = this._element.querySelector(this._inputSelector);
    const errorMessageElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    // const errorMessage = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = errorMessage;
    errorMessageElement.classList.add(this._errorClass);
    // return this._showInputError(inputElement, errorMessage);
  }

  _hideInputError(inputElement) {
    // const inputElement = this._element.querySelector(this._inputSelector);
    const errorMessageElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    // const inputElement = this._element.querySelector(this._inputSelector);
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    // const inputElement = this._element.querySelector(".modal__input");
    //valid must have all valid
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputElements)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  enableValidation() {
    this._element.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}
