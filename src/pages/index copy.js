import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

const cardData = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-F1.amazonaws.com/software-engineer/around-project/lago.jpg ",
};

// const formValidation = new FormValidator(config);

// // Enable validation for the form
// formValidation.enableValidation();

const previewImageModal = document.querySelector("#preview-image-modal");
const modalImage = previewImageModal.querySelector(".modal__image");
const modalText = previewImageModal.querySelector(".modal__text");
const cardsListElement = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardElement = cardTemplate.cloneNode(true);

//const cardImageElement = cardElement.querySelector(".cards__image");

function handleImageClick() {
  openModal(previewImageModal);

  modalImage.alt = cardData.name;
  modalImage.src = cardData.link;
  modalText.textContent = cardData.name;
}

/** set event listener for the fcard elements should be inside the Card<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 *
 * const handleImageClick = () => {
 *  console.log(12312312)
 * }
 */

// function createCard(cardData) {
//   const card = new Card(cardData, "#card-template", handleImageClick);
//   return card.getView();
//   cardsListElement.prepend(cardElement);
// }

// function renderCard(cardElement) {
//   cardsListElement.prepend(cardElement);
// }

// initialCards.forEach((cardData) => {
//   const newCardElement = createCard(cardData);
//   cardsListElement.append(newCardElement);
// });
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  // below we need to create a variable wwith the card.getView result. This variable will have a DOM node
  return card.getView();
}

// let cardNewElement = card.getView();

// initialCards.forEach((cardData) => {
//   const cardElement = createCard(cardData);
//   cardsListElement.prepend(cardElement);
// });

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsListElement.prepend(cardElement);
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

// cardsListElement.prepend(cardNewElement);

// below we need to create a variable wwith the card.getView result. This variable will have a DOM node
// next step is to render your card using the append or prepend<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//elements

//moved variables from getCard local to global for acccesibiility?

// const likeButton = cardElement.querySelector(".cards__like-button");
// const deleteButton = cardElement.querySelector(".cards__delete-button");

const profileEditModal = document.querySelector("#profile-edit-modal"); //instead of using identical yet confusing paired class names we create an id

const addNewCardModal = document.querySelector("#add-card-modal");

const modals = [profileEditModal, previewImageModal, addNewCardModal];

const profileTitle = document.querySelector(".profile__title "); //target id on HTML and create variable on JS
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

const profileEditForm = profileEditModal.querySelector(".modal__form_profile");
const addCardEditForm = addNewCardModal.querySelector(".modal__form_card");

//buttons
const profileEditButton = document.querySelector("#profile-edit-button"); //storing edit button inside this variable

const addNewCardButton = document.querySelector("#profile-add-button"); //new modal

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

//const handleLikeIcon = (event) => {
//event.target.classList.toggle("cards__like-button_active");
//};

profileEditButton.addEventListener("click", (e) => {
  e.preventDefault();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent; //preset value input to what is already occupying input value
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardEditForm.addEventListener("submit", handleAddCardFormSubmit);
//add new card
addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));

//functions
function openModal(modal) {
  addEscapeKeyListener();
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  removeEscapeKeyListener();
  modal.classList.remove("modal_opened");
}

// function renderCard(cardData) {
//   const cardElement = getCardElement(cardData);
//   cardsListElement.prepend(cardElement);
// }

function handleDeleteCard() {
  cardElement.remove();
}

//deleteButton.addEventListener("click", handleDeleteCard);

//event handlers

// function getCardElement(cardData) {
//   //   //clone the template element with all its content and store it in a cardElement variable
//   //   // const cardTemplate =
//   //   // document.querySelector("#card-template").content.firstElementChild;
//   const cardElement = cardTemplate.cloneNode(true);

//   //   // const cardImageElement = cardElement.querySelector(".cards__image");
//   //   // const cardTitleElement = cardElement.querySelector(".cards__title");

//   //   // const likeButton = cardElement.querySelector(".cards__like-button");
//   //   // const deleteButton = cardElement.querySelector(".cards__delete-button");

//   //   // likeButton.addEventListener("click", handleLikeIcon);
//   //   // deleteButton.addEventListener("click", handleDeleteCard);

//   //   // cardImageElement.src = cardData.link;
//   //   // //set the image alt text to the name field of the object
//   //   // cardImageElement.alt = cardData.name;
//   //   // //set the card title to the name field of the object, too
//   //   // cardTitleElement.textContent = cardData.name;

//   //   //return the ready HTML element with the filled-in data
//   return cardElement;
// }

function handleProfileEditSubmit(event) {
  event.preventDefault(); //prevent from reloading the entire page
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  // const cardElement = createCard({ name, link });
  // cardsListElement.prepend(cardElement);
  renderCard({ name, link }, cardsListElement);
  event.target.reset();
  closeModal(addNewCardModal);
  addNewCardFormValidator.toggleButtonState();
}

// initialCards.forEach((cardData) => renderCard(cardData));

//MODAL Close functions

function addEscapeKeyListener() {
  document.addEventListener("keydown", handleEscapeKey);
}

function removeEscapeKeyListener() {
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    modals.forEach(closeModal);
  }
}

function closeModalOnClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
}

modals.forEach((modal) => {
  modal.addEventListener("click", closeModalOnClick);
});

/*const likeButtons = document.querySelectorAll(".cards__like-button");
likeButtons.forEach((likeButton) => {});
likeButton.addEventListener("click", () => {
  likeButton.classList.toggle("cards__like-button_active");
});*/
const defaultFormConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const editProfileFormModalWindow = document.querySelector(
  ".modal__form_profile"
);
const addNewCardFormModalWindow = document.querySelector(".modal__form_card");
const editProfileFormValidator = new FormValidator(
  defaultFormConfig,
  editProfileFormModalWindow
);
const addNewCardFormValidator = new FormValidator(
  defaultFormConfig,
  addNewCardFormModalWindow
);

editProfileFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();
