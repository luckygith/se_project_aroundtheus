class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._element = formElement;
  }
}

showInputError(inputElement, { inputErrorClass, errorClass }) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`
      ); 
      inputElement.classList.add(inputErrorClass);
      errorMessageElement.textContent = inputElement.validationMessage;
      errorMessageElement.classList.remove(errorClass);
};

hideInputError( inputElement,
    { inputErrorClass, errorClass }
  ) {const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass); 
  errorMessageElement.textContent = "";
  errorMessageElement.classList.add(errorClass); 
  }

 checkInputValidity(inputElement, options) {
    if (!inputElement.validity.valid) {
      return showInputError(formElement, inputElement, options);
    }
    hideInputError(inputElement, options);
  }
  
  hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }
  
  disableButton(submitButton, options) {
    submitButton.classList.add(options.inactiveButtonClass);
    submitButton.disabled = true;
  }
  
  enableButton(submitButton, options) {
    submitButton.classList.remove(options.inactiveButtonClass);
    submitButton.disabled = false;
  }
  
toggleButtonState(inputElements, submitButton, options) {
    if (hasInvalidInput(inputElements)) {
      disableButton(submitButton, options);
    } else {
      enableButton(submitButton, options);
    }

setEventListeners(formElement, options) {
        const { inputSelector, submitButtonSelector } = options; 
        const submitButton = formElement.querySelector(submitButtonSelector);
        const inputElements = [...formElement.querySelectorAll(inputSelector)];
        
        toggleButtonState(inputElements, submitButton, options);
        
        inputElements.forEach((inputElement) => {
          inputElement.addEventListener("input", (event) => {
            event.preventDefault();
           
            toggleButtonState(inputElements, submitButton, options);
          });
        });
      }

 enableValidation(options) {
        const formElements = [...document.querySelectorAll(options.formSelector)]; 
        formElements.forEach((formElement) => {

          formElement.addEventListener("submit", (event) => {
            event.preventDefault();
          });
          setEventListeners(formElement, options);
        });
      }

        
