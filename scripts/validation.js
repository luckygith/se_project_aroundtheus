// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  //const { inputErrorClass } = options; //creating variable and using object destructuring and pulling it off of options
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  ); //"#" + inputElement.id + "-error"
  inputElement.classList.add(inputErrorClass); // class added that makes it red - OBJECT DESTRUCTURING (options.inputErrorClass)
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.remove(errorClass); //fade in
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  //const { inputErrorClass } = options; //creating variable and using object destructuring and pulling it off of options
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  ); //"#" + inputElement.id + "-error"
  inputElement.classList.remove(inputErrorClass); // class added that akes it red - OBJECT DESTRUCTURING (options.inputErrorClass)
  errorMessageElement.textContent = "";
  errorMessageElement.classList.add(errorClass); //fade in
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  hideInputError(formElement, inputElement, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function disableButton(submitButton) {
  submitButton.classList.add("modal__button_disabled");
  submitButton.disabled = true;
}

function enableButton(submitButton) {
  submitButton.classList.remove("modal__button_disabled");
  submitButton.disabled = false;
}

function toggleButtonState(inputElements, submitButton) {
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton);
  } else {
    enableButton(submitButton);
  }
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options; //const inputSelector = options.inputSelector  OBJECT DESTRUCTURING; sets value to the property
  const submitButton = formElement.querySelector(".modal__button");
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      // add event listener for each input key to be listened to for validation
      checkInputValidity(formElement, inputElement, options); //shows details such as true or false validity// add event listener for each input key to be listened to for validation
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)]; //select and create new shallow copied array from an array-like or iterable object
  formElements.forEach((formElement) => {
    //anonymous function
    //loop through each form element and add event listeners to them
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: ".modal__error_visible",
});

enableValidation(config);
