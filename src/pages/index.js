//IMPORT ALL CLASSES
import { initialCards, selectors, config } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/userInfo.js";

import "../pages/index.css";

// CONSTANT
const addNewCardButton = document.querySelector("#profile-add-button");

const profileEditButton = document.querySelector("#profile-edit-button"); //storing edit button inside this variable
const profileTitle = document.querySelector(".profile__title "); //target id on HTML and create variable on JS
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
//const modal = document.querySelector(".modal");

const cardsListItem = document.querySelector(".cards__list-item");
const modalImage = document.querySelector(".modal__image");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

const editProfileModal = document.querySelector("#profile-edit-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form_profile");

const addNewCardModal = document.querySelector("#add-card-modal");
const editAddCardForm = addNewCardModal.querySelector(".modal__form_card");

const cardsListElement = document.querySelector(".cards__list");
const addCardForm = document.querySelector("#add-card-form");

//CREATE NEW INSTANCES OF ALL CLASSES // INITIALIZE

const cardPreviewPopup = new PopupWithImage("#preview-image-modal");
cardPreviewPopup.setEventListeners();

const editProfileFormValidator = new FormValidator(config, editAddCardForm);
editProfileFormValidator.enableValidation();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);
cardSection.renderItems();

const editProfilePopup = new PopupWithForm(
  selectors.editProfileModal,
  handleEditProfileFormSubmit
);
editProfilePopup.setEventListeners();

const editUserInfo = new UserInfo({
  titleSelector: ".profile__title",
  occupationSelector: ".profile__description",
});

const addNewCardPopup = new PopupWithForm(
  selectors.addCardModal,
  handleAddCardFormSubmit
);

const addNewCardFormValidator = new FormValidator(config, addCardForm);
addNewCardFormValidator.enableValidation();

// FUNCTIONS

function handleImageClick(cardData) {
  modalImage.alt = cardData.name;
  modalImage.src = cardData.link;
  modalText.textContent = cardData.name;
  cardPreviewPopup.open(cardData);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);

  return card.getView();
}

function handleAddCardFormSubmit(event) {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  //modalImage.alt = name;
  // modalImage.src = link;
  //modalText.textContent = cardData.name;

  const cardElement = createCard({ name, link }, modalImage);
  //cardElement.getView(modalImage);
  cardsListElement.prepend(cardElement);
  addNewCardPopup.close();
}

function handleEditProfileFormSubmit() {
  const name = profileTitleInput.value;
  const description = profileDescription.value;

  editUserInfo.setUserInfo({ name, description });
  // editUserInfo.setUserInfo({ name, description });
  editProfilePopup.close();
}

//   cardData.name = cardTitleInput.value;
//   cardData.link = cardUrlInput.value;
//   // const cardElement = createCard({ name, link });
//   // cardsListElement.prepend(cardElement);
//   //this._cardElement = this._getCardElement();
//   return card.getView();
// }

profileEditButton.addEventListener("click", () => {
  const { name, description } = editUserInfo.getUserInfo();

  profileTitleInput.value = name;
  profileDescriptionInput.value = description;

  editProfilePopup.open();
  addNewCardFormValidator.resetValidation();
});

addNewCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addNewCardPopup.open();
  addNewCardFormValidator.resetValidation();
});

//ALL THE REST

//function handleAddCardFormSubmit({ title: name, subtitle: link })

// editUserInfo.setUserInfo(inputValues);

// editProfilePopup.close();
