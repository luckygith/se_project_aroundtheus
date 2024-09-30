//IMPORT ALL CLASSES
import { initialCards, selectors, config } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/userInfo.js";
import Api from "../components/Api.js";

import "../pages/index.css";
import Popup from "../components/Popup.js";
import PopupWithDeleteConfirmation from "../components/PopupWithDeleteConfirmation.js";

// CONSTANT
const deleteCardButton = document.querySelector(".cards__delete-button");
const confirmDeleteButton = document.querySelector("#confirm-delete-button");
const addNewCardButton = document.querySelector("#profile-add-button");

const profileEditButton = document.querySelector("#profile-edit-button"); //storing edit button inside this variable
const profileTitle = document.querySelector(".profile__title "); //target id on HTML and create variable on JS
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardsListItem = document.querySelector(".cards__list-item");
const modalImage = document.querySelector(".modal__image");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

const profileAvatarElement = document.querySelector(".profile__avatar");
const profileAvatarUrlInput = document.querySelector("#avatar-url-input");
const profileAvatarButton = document.querySelector(
  ".profile__container-edit-icon"
);

const editProfileModal = document.querySelector("#profile-edit-modal");
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");
const updateAvatarForm = document.querySelector("#update-avatar-form");
const addCardForm = document.querySelector("#add-card-form");

//CREATE NEW INSTANCES OF ALL CLASSES // INITIALIZE

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7bed9883-2658-4b5e-974b-2c2e17824760",
    "Content-Type": "application/json",
  },
});

const deleteCardPopup = new PopupWithDeleteConfirmation(
  "#delete-card-modal",
  handleConfirmDeleteSubmit
);

deleteCardPopup.setEventListeners();

const cardPreviewPopup = new PopupWithImage("#preview-image-modal");

const editProfileFormValidator = new FormValidator(config, editProfileForm);

const editProfilePopup = new PopupWithForm(
  selectors.editProfileModal,
  handleEditProfileFormSubmit
);

const editUserInfo = new UserInfo({
  titleSelector: ".profile__title",
  occupationSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const addNewCardPopup = new PopupWithForm(
  selectors.addNewCardModal,
  handleAddCardFormSubmit
);

const updateAvatarPopup = new PopupWithForm(
  selectors.updateAvatarModal,
  handleProfileUpdateAvatarFormSubmit
);

const addNewCardFormValidator = new FormValidator(config, addCardForm);
addNewCardFormValidator.enableValidation();

const updateAvatarFormValidator = new FormValidator(config, updateAvatarForm);
updateAvatarFormValidator.enableValidation();

//USERS

//User Profile

let userInfo;

api
  .getUserInfo() //fetch info using api.getUserInfo()
  .then((result) => {
    userInfo = result; //store info in const
    console.log(userInfo);
  })
  .then(() => {
    console.log();
    editUserInfo.setUserAvatarInfo({ avatar: userInfo.avatar });
    editUserInfo.setUserInfo({
      name: userInfo.name,
      description: userInfo.about,
      avatar: userInfo.avatar,
    });
  })
  .catch((err) => {
    console.error("User Info retrieval unsuccessful", err);
  });

function handleEditProfileFormSubmit(inputValues) {
  editProfilePopup.submitButtonLoadingState(false);

  const name = inputValues.title;
  const about = inputValues.description;

  api
    .editProfile({ name, about })
    .then((result) => {
      console.log(result);
      editUserInfo.setUserInfo({
        name: result.name,
        description: result.about,
        avatar: result.avatar,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Changes to profile submission unsuccessful. Error.", err);
    })
    .finally(() => {
      editProfilePopup.submitButtonLoadingState(true);
    });
}

editProfileFormValidator.enableValidation();

function handleProfileUpdateAvatarFormSubmit(inputValues) {
  updateAvatarPopup.submitButtonLoadingState(false);

  const avatar = inputValues.URL;

  api
    .editProfileAvatar({ avatar })
    .then((result) => {
      console.log(result);
      editUserInfo.setUserAvatarInfo({ avatar: result.avatar });
      updateAvatarPopup.close();
      console.log("Avatar has been changed to the following avatar", avatar);
    })
    .catch((err) => {
      console.error("Profile Avatar edit api unsuccessful. Error", err);
    })
    .finally(() => {
      updateAvatarPopup.submitButtonLoadingState(true);
      console.log(avatar);
    });
}

//CARDS

let cardSection;

api
  .getInitialCards()
  .then((result) => {
    console.log(result);
    cardSection = new Section(
      {
        items: result,
        renderer: createCard,
      },
      ".cards__list"
    );
    cardSection.renderItems();
    return result;
  })
  .catch((err) => {
    console.error("Card retrieval unsuccessful. Error", err);
  });

// FUNCTIONS & APIs

function handleImageClick(cardData) {
  cardPreviewPopup.open(cardData);
  console.log(cardData);
}

function handleConfirmDeleteSubmit(cardId, cardElement) {
  api
    .deleteCard(cardId, cardElement)
    .then(() => {
      cardElement.remove(cardId);
      console.log(cardId, "post has been deleted");
      cardElement = null;
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error("Card deletion unsuccessful. Error", err);
    });
}

function handleDeletePopup(cardId, cardElement) {
  deleteCardPopup.open(cardId, cardElement);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeletePopup,
    handleCardLike
  );
  console.log("The following new card has been created", cardData);
  return card.getView();
}

let cardELement;

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.URL;

  addNewCardPopup.submitButtonLoadingState(false);

  api
    .addingNewCard({ name: inputValues.title, link: inputValues.URL })
    .then((res) => {
      const cardElement = createCard(res);
      cardSection.addItem(cardElement);
      console.log(res);
      addNewCardPopup.close();
    })
    .catch((err) => {
      addNewCardFormValidator.resetValidation();
      console.error("Failed to add new card.", err);
    })
    .finally(() => {
      addNewCardPopup.submitButtonLoadingState(true);
    });
}

function handleCardLike(isLiked, cardData, cardId, card) {
  if (!isLiked) {
    api
      .addLikeState(cardId, cardData)
      .then((res) => {
        card.handleIsLiked(res.isLiked);
        console.log(res.isLiked);
      })
      .catch((err) => {
        console.log("Failed to add like. Error with API call.", err);
      })
      .finally(() => {
        console.log(cardId, cardData, "card is updated");
      });
  } else {
    api
      .removeLikeState(cardId)
      .then((res) => {
        card.handleIsLiked(res.isLiked);
        console.log(res.isLiked);
        console.log(res);
      })
      .catch((err) => {
        console.log("Failed to remove like. Error with API call.", err);
      })
      .finally((res) => {
        console.log(cardId, "card is updated");
      });
  }
}

//EVENTLISTENERS

profileEditButton.addEventListener("click", () => {
  console.log("PROFILE EDIT PRESSED");
  addNewCardFormValidator.resetValidation();
  const { name, description } = editUserInfo.getUserInfo();

  profileTitleInput.value = name;
  profileDescriptionInput.value = description;

  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  console.log("addnewcardbuttoned clicked");
  addNewCardPopup.open();
  addNewCardFormValidator.resetValidation();
});

profileAvatarButton.addEventListener("click", () => {
  updateAvatarFormValidator.resetValidation();

  profileAvatarUrlInput.value = "";
  profileTitleInput.value = "";
  profileDescriptionInput.value = "";

  updateAvatarPopup.open();
});
