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
//const modal = document.querySelector(".modal");

const cardsListItem = document.querySelector(".cards__list-item");
const modalImage = document.querySelector(".modal__image");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

const editProfileModal = document.querySelector("#profile-edit-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form_profile");

const addNewCardModal = document.querySelector("#add-card-modal");

const cardsListElement = document.querySelector(".cards__list");
const addCardForm = document.querySelector("#add-card-form");

//CREATE NEW INSTANCES OF ALL CLASSES // INITIALIZE

// deleteCardButton.addEventListener("click", () => {
//   console.log("card delete button pressed");
// });
// deleteCardButton.addEventListener("click", () => {
//   console.log("PROFILE EDIT PRESSED");
// });

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

// fetch("https://jsonplaceholder.typicode.com/users/1")
//   .then((response) => {
//     return response.json();
//   })

//   .then((result) => {
//     console.log(result);
//   });

// fetch("https://jsonplaceholder.typicode.com/todos/1", {
//   headers: { authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6" },
// })
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return res.json();
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "872104b8-5f7e-4344-99c5-6089723feaef",
    "Content-Type": "application/json",
  },
});

// api
//   .getInitialCards()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

//USERS
// function renderUserInfo(userInfo) {
//   // Function to render user information
//   // Update header elements with user information
//   document.getElementById(
//     "userAvatar"
//   ).innerHTML = `<img src="${userInfo.avatar}" alt="User Avatar" width="100">`;
//   document.getElementById("userName").textContent = userInfo.name;
//   document.getElementById("userAbout").textContent = userInfo.about;
// }

let userInfo;

//API instances

api
  .getUserInfo()
  .then((result) => {
    console.log(result);
    userInfo = result;
  })
  .catch((err) => {
    console.err(err);
  });

const updateName = "Marie Skłodowska Curie";
const updateAbout = "Physicist and Chemist";

api
  .editProfile(updateName, updateAbout)
  .then((result) => {
    console.log(result);
    userInfo = result;
  })
  .catch((err) => {
    console.err(err);
  });

//CARDS
api
  .getInitialCards()
  .then((result) => {
    console.log(result);
    // process the result
  })
  .catch((error) => {
    console.error(error); // log the error to the console
  });

const newCardTitle = "New Card Title";
const newCardLink = "https://example.com/image.jpg";

api
  .addingNewCard(newCardTitle, newCardLink)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// api
//   .deleteCard()
//   .then((result) => {
//     console.log(result.message);
//     // Remove the card element from the DOM
//     document.querySelector(`.cards__list-item[data-id="${cardId}"]`).remove();
//   })
//   .catch((err) => {
//     console.error(`Error: ${err}`);
//   });

// // Method to like a card
// likeCard(cardId) {
//   // Implement the logic to like a card on the server
// }

// // Method to remove a like from a card
// unlikeCard(cardId) {
//   // Implement the logic to remove a like from a card on the server
// }

// // Method to update profile picture
// updateProfilePicture(avatarUrl) {
//   // Implement the logic to update profile picture on the server
// }

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((json) => console.log(json));
// //const baseUrl = "https://around-api.en.tripleten-services.com/v1";

// function testingFunctionFetch() {
//   fetch("https://around-api.en.tripleten-services.com/v1").then((response) => {
//     .then((response) => {
//       if (response.ok) {
//         return response.json()
//     .then((data => {
//       console.log(response);
//     console.log("fetching");
//     });
//   } else {
//     console.log("Error:", response.status);
//   });
// }

// testingFunctionFetch();

// const baseUrl = "https://around-api.en.tripleten-services.com/v1";

// function testingFunctionFetch() {
//   fetch(baseUrl)
//     .then((response) => {
//       // Check if the response is successful
//       if (response.ok) {
//         // Parse the response body as JSON and log it
//         return response.json().then((data) => {
//           console.log(data);
//           console.log("fetching successful");
//         });
//       } else {
//         // If response is not successful, log the status code
//         console.log("Error:", response.status);
//       }
//     })
//     .catch((error) => {
//       // Log any errors that occur during the fetch
//       console.error("Error fetching data:", error);
//     });
// }

// // Call the function
// testingFunctionFetch();

const cardPreviewPopup = new PopupWithImage("#preview-image-modal");
//cardPreviewPopup.setEventListeners();

const editProfileFormValidator = new FormValidator(config, editProfileForm);

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
//editProfilePopup.setEventListeners();

//console.log(editProfileModal);

const editUserInfo = new UserInfo({
  titleSelector: ".profile__title",
  occupationSelector: ".profile__description",
});

const addNewCardPopup = new PopupWithForm(
  selectors.addNewCardModal,
  handleAddCardFormSubmit
);
//console.log(addNewCardModal);

const addNewCardFormValidator = new FormValidator(config, addCardForm);
addNewCardFormValidator.enableValidation();

// FUNCTIONS

// function handleDeleteCardSubmit(cardElement) {
//   this._element.remove();
//   this._element = null;
//   deleteCardPopup.close();
// }

// _handleDeleteCard() {
//   this._element.remove();
//   this._element = null;
// }

//deleteCardPopup.open();

// deleteCardButton.addEventListener("click", () => {
//   console.log("delete card button clicked");
//   deleteCardPopup.open(); // Open the delete card modal
// });

// deleteCardButton.addEventListener(
//   "click",
//   console.log("THIS IS THE ONE THAT IS WORKING TODAY")
// );

// deleteCardButton.addEventListener("click", () => {
//   console.log("Delete card button working"); // Open the delete card popup
// });

function handleImageClick(cardData) {
  modalImage.alt = cardData.name;
  modalImage.src = cardData.link;
  modalText.textContent = cardData.name;
  cardPreviewPopup.open(cardData);
}

function createCard(cardData) {
  // currentCardData = cardData;

  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteSubmit,
    handleConfirmDeleteSubmit
  );

  return card.getView();
}

//console.log(card.getId());
//console.log(._id);

function handleAddCardFormSubmit(event) {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  //modalImage.alt = name;
  // modalImage.src = link;
  //modalText.textContent = cardData.name;

  const cardElement = createCard({ name, link }, modalImage);
  cardSection.addItem(cardElement);
  addNewCardPopup.close();
}

function handleEditProfileFormSubmit() {
  const name = profileTitleInput.value;
  const description = profileDescriptionInput.value;

  editUserInfo.setUserInfo({ name, description });
  // editUserInfo.setUserInfo({ name, description });

  editProfilePopup.close();
}

editProfileFormValidator.enableValidation();

const deleteCardPopup = new PopupWithDeleteConfirmation(
  "#delete-card-modal",
  handleConfirmDeleteSubmit
);

function handleDeleteSubmit(cardElement) {
  //currentCardData = cardData;

  deleteCardPopup.open(cardElement);
  //handleConfirmDeleteSubmit(cardData);
  console.log("JUMPJUMP");
}

//console.log(cardElement.id);

// function handleConfirmDeleteSubmit(event) {
//   event.preventDefault();
//   //cardSection.removeItem(cardElement);
//   cardElement.remove();
//   // cardElement = null;
//   console.log("handleConfirmDelete accessed");
//   deleteCardPopup.close();
// }

function handleConfirmDeleteSubmit(event, cardData) {
  event.preventDefault();
  // Handle confirm delete logic here
  cardData.element.remove();
  cardData.element = null;
  deleteCardPopup.close();
  console.log("Card deleted successfully");
}

//confirmDeleteButton.addEventListener("click", handleConfirmDeleteSubmit);
//deleteCardPopup.close(cardData);

confirmDeleteButton.addEventListener("click", (cardData) => {
  //event.preventDefault;
  console.log("__________________________________________");
  handleConfirmDeleteSubmit(cardData);
});
