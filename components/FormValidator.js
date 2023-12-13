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
    // const { inputSelector, submitButtonSelector } = options;
    const submitButton = this._element.querySelector(".modal__button");
    const inputElements = [...this._element.querySelectorAll(".modal__input")];
    this._submitButton = submitButton;
    this._inputElements = inputElements;

    // toggleButtonState(inputElements, submitButton, options);

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (event) => {
        event.preventDefault();
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  _showInputError() {
    console.log("showinput Error is on");
    const inputElement = this._element.querySelector(".modal__input");
    const errorMessageElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.remove(this._errorClass);
  }

  _hideInputError() {
    console.log("hide Input error activated");
    const inputElement = this._element.querySelector(".modal__input");
    const errorMessageElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.add(this._errorClass);
  }

  _checkInputValidity() {
    const inputElement = this._element.querySelector(".modal__input");
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

  _disableButton(submitButton) {
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

  enableValidation(options) {
    // const formElements = [...document.querySelectorAll(options.formSelector)];
    // formElements.forEach((formElement) => {
    this._element.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
