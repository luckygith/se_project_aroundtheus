class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._element = formElement;
  } //excluding formselector since it will be a second argument

  _setEventListeners() {
    const submitButton = this._element.querySelector(".modal__button");
    const inputElements = [
      ...this._element.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = submitButton;
    this._inputElements = inputElements;

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (event) => {
        event.preventDefault();
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  _showInputError() {
    const inputElement = this._element.querySelector(this._inputSelector);
    const errorMessageElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError() {
    const inputElement = this._element.querySelector(this._inputSelector);
    const errorMessageElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity() {
    const inputElement = this._element.querySelector(this._inputSelector);
    if (!inputElement.validity.valid) {
      return this._showInputError();
    } else {
      this._hideInputError();
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

  _toggleButtonState() {
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

export default FormValidator;
