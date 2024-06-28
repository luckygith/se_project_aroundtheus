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

const editProfileModal = document.querySelector("#profile-edit-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form_profile");

const addNewCardModal = document.querySelector("#add-card-modal");

const cardsListElement = document.querySelector(".cards__list");
const addCardForm = document.querySelector("#add-card-form");



//CREATE NEW INSTANCES OF ALL CLASSES // INITIALIZE

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "872104b8-5f7e-4344-99c5-6089723feaef",
    "Content-Type": "application/json",
  },
});

const deleteCardPopup = new PopupWithDeleteConfirmation(
  "#delete-card-modal",
  handleDeleteSubmit
);

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

const editUserInfo = new UserInfo({
  titleSelector: ".profile__title",
  occupationSelector: ".profile__description",
});

const addNewCardPopup = new PopupWithForm(
  selectors.addNewCardModal,
  handleAddCardFormSubmit
);

const addNewCardFormValidator = new FormValidator(config, addCardForm);
addNewCardFormValidator.enableValidation();


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




//API instances

//User routes

// GET /users/me – Get the current user’s info
// PATCH /users/me – Update your profile information
// PATCH /users/me/avatar – Update avatar
// Card routes

// GET /cards – Get all cards
// POST /cards – Create a card
// DELETE /cards/:cardId – Delete a card
// PUT /cards/:cardId/likes – Like a card
// DELETE /cards/:cardId/likes – Dislike a card


//User Profile 

let userInfo;


api
  .getUserInfo()
  .then((result) => {
    console.log(result);
    userInfo = result;
  })
  .then(() => {
    console.log(userInfo._id);
  })
  .catch((err) => {
    console.error(err); 
  });
//===========================================
  api
  .getUserInfo()
  .then((userInfo) => {
    console.log("User Info:", userInfo); // Log the user info
    return api.getInitialCards(); // Return the promise for the next call
  })
  .then((initialCards) => {
    console.log(initialCards); // Log the initial cards
  })
  .catch((err) => {
    console.error(err); // Handle any errors
  });

  function handleEditProfileFormSubmit() {
    const name = profileTitleInput.value;
    const about = profileDescriptionInput.value;
  
    // editUserInfo.setUserInfo({ name, description });
  
    api
    .editProfile({name, about})
    .then((result) => {
      console.log(result);
      userInfo.setUserInfo({name, about});
      //editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err); 
    });
  }
  
  editProfileFormValidator.enableValidation();
  

 //console.log(api.getUserInfo(userInfo));

  const updateName = document.querySelector("#profile-title-input");
  const updateDescription = document.querySelector("#profile-description-input");


// const updateName = "Marie Skłodowska Curie";
// const updateAbout = "Physicist and Chemist";

//CARDS
let cardsArray

api
  .getInitialCards()
  .then((result) => {
    console.log(result);
    cardsArray = result;
    return result;
  })
  .catch((err) => {
    console.error(err); 
  });

// FUNCTIONS


function handleImageClick(cardData) {
  modalImage.alt = cardData.name;
  modalImage.src = cardData.link;
  modalText.textContent = cardData.name;
  cardPreviewPopup.open(cardData);
}


function handleDeleteSubmit(card, cardData) {
deleteCardPopup.open(cardData);
  console.log(cardData);
 
  api
  .deleteCard(card_id)
  .then(() => {
    card.handleConfirmDeleteSubmit();
    console.log("card deleted successfully");   
    deleteCardPopup.close();
  })
  .catch((err) => {
    console.error(err);
  });
}

// api.deleteCard(card.id)
//     .then(() => {
//       card.remove();
//       deleteCardPopup.close();
//     })
//     .catch((err) => {
//       console.error(err);
//     });

function createCard({name, link}) {

  const card = new Card(
    {name, link},
    "#card-template",
    handleImageClick,
    handleDeleteSubmit
  );
  return card.getView();
}


// const newCardTitle = "New Card Title";
// const newCardLink = "https://example.com/image.jpg";



function handleAddCardFormSubmit() {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  //modalImage.alt = name;
  // modalImage.src = link;
  //modalText.textContent = cardData.name;

  api
  .addingNewCard(name, link)
  .then((name, link) => {
    const cardElement = createCard(name, link);
    cardSection.addItem(cardElement);
    console.log(name, link);
    addNewCardPopup.close();
  })
  .catch((err) => {
    console.error(err); 
  });
}




//console.log(cardElement.id);


// function handleConfirmDeleteSubmit(event, card) {
//   event.preventDefault();
//   // Handle confirm delete logic here
//   cardData.element.remove();
//   cardData.element = null;
//   deleteCardPopup.close();
//   console.log("Card deleted successfully");
// }

//confirmDeleteButton.addEventListener("click", handleConfirmDeleteSubmit);
//deleteCardPopup.close(cardData);




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

confirmDeleteButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("__________________________________________");
  handleDeleteSubmit(card, cardData);
});




  // const promise = new Promise(function (resolve, reject) {
  //   // resolve or reject promise
  // });
  // w:
  // promise
  //   .then(function (value) {
  //     // will be called if promise resolves
  //   })
  //   .catch(function (value) {
  //     // will be called if promise rejects
  //   })
  //   .finally(function (value) {
  //     // will be called in both cases
  //   });
  


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
//   .catch((err) => {
//     console.error(err);
//   });


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
//       console.error(err);
//     });
// }

// // Call the function
// testingFunctionFetch();

