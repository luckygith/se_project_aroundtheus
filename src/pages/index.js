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
const profileAvatarButton = document.querySelector(".profile__container-edit-icon");

const editProfileModal = document.querySelector("#profile-edit-modal");
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");
const editProfileSubmitButton = editProfileModal.querySelector(".modal__button");

//const updateAvatarModal = document.querySelector("#update-avatar-modal");
const updateAvatarForm = document.querySelector("#update-avatar-form");
// const updateProfileAvatarSubmitButton = updateAvatarModal.querySelector(".modal__button");

//const addNewCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
// const addNewCardSubmitButton = addNewCardModal.querySelector(".modal__button");







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
  handleConfirmDeleteSubmit,
);

deleteCardPopup.setEventListeners();

const cardPreviewPopup = new PopupWithImage("#preview-image-modal");
//cardPreviewPopup.setEventListeners();



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


// TODO delete

api
  .getUserInfo() //fetch info using api.getUserInfo()
  .then((result) => {
    userInfo = result; //store info in const
    console.log(userInfo);
    return api.getInitialCards();
  })
  .then((initialCards) => {
    console.log(initialCards);
        editUserInfo.setUserAvatarInfo({ avatar: userInfo.avatar });
        editUserInfo.setUserInfo({ name: userInfo.name, description: userInfo.about, avatar: userInfo.avatar });
    // //console.log(cardData);
    // return userInfo._id;
  })
  .catch((err) => {
    console.error(err);
    console.error("")
  });


  function handleEditProfileFormSubmit(cardData) {
    editProfilePopup.submitButtonLoadingState(false); 
  //   profileTitleInput.value = userInfo.name;   // Pre-fill with current name
  // profileDescriptionInput.value = userInfo.about; 
    
    const name = profileTitleInput.value;
    const about = profileDescriptionInput.value;

    api
    .editProfile({name, about})
    .then((result) => {
      //editProfileSubmitButton.textContent = "Saving..."
      console.log(result);
      editUserInfo.setUserInfo({name: result.name, description: result.about});
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
      console.error("Changes to profile submission unsuccessful. Error."); 
    })
    .finally(() => {
      editProfilePopup.submitButtonLoadingState(true); 
      
    });
  }
  

  editProfileFormValidator.enableValidation();
  
  


  function handleProfileUpdateAvatarFormSubmit() {

    updateAvatarPopup.submitButtonLoadingState(false);

    const avatar = profileAvatarUrlInput.value;

    api.editProfileAvatar({avatar})
    .then((result) => {
      console.log(result);
      editUserInfo.setUserAvatarInfo({avatar: result.avatar});
      updateAvatarPopup.close();
  console.log("Avatar has been changed to the following avatar", avatar)
    })
    .catch((err) => {
      console.error(err);
      console.error("Profile Avatar edit api unsuccessful. Error")
    }) 
    .finally(() => {
      updateAvatarPopup.submitButtonLoadingState(true); 
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
    console.error(err); 
    console.error("Card retrieval unsuccessful. Error");
  });


// TODO call api.getUserInfo
// in the .then(), set the user info

// FUNCTIONS


function handleImageClick(cardData) {
  modalImage.alt = cardData.name;
  modalImage.src = cardData.link;
  modalText.textContent = cardData.name;
  cardPreviewPopup.open(cardData);
  console.log(cardData);
}


function handleConfirmDeleteSubmit(cardId, cardElement) {
;
  api
  .deleteCard(cardId, cardElement)
  .then(() => {
    cardElement.remove(cardId);
    console.log(cardId, "post has been deleted");
    cardElement = null;
    deleteCardPopup.close();
  })
  .catch((err) => {
    console.error(err);
    console.error("Card deletion unsuccessful. Error")
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
    handleCardLike,
    // checkLikeStatus,
   // toggleLikeIcon,
  );
  console.log("The following new card has been created", cardData);
  return card.getView();
}

let cardELement

function handleAddCardFormSubmit() {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  //modalImage.alt = name;
  // modalImage.src = link;
  //modalText.textContent = cardData.name;
  addNewCardPopup.submitButtonLoadingState(false); 

  api
  .addingNewCard(name, link)
  .then((name, link) => {
    const cardElement = createCard(name, link, isLiked);
    cardSection.addItem(cardElement);
    console.log(cardElement);
    addNewCardPopup.close();
  })
  .catch((err) => {
    console.error(err); 
  })
  .finally(() => {
    addNewCardPopup.submitButtonLoadingState(true); 
  });
}

    
function handleCardLike(isLiked, cardData, cardId, cardElement, card) {

  if (!isLiked) {
    api.addLikeState(cardId, cardData)
      .then((res) => {
        console.log(res);
        console.log(cardId, cardData, "card is Liked");
     card.toggleLikeIcon(res.isLiked);
   
      })
        .catch((err) => {
          console.error(err);
          console.log("Failed to add like. Error with API call.");

        })
        .finally((res) => {
          card.checkLikeStatus(res.isLiked, res.cardData);
        })

      } else {
          api.removeLikeState(cardId)
          .then((res) => {
      
            console.log(res.isLiked);
            console.log(cardId, "card is disliked?");
            card.toggleLikeIcon(res.isLiked);
     
      
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
            console.log("Failed to remove like. Error with API call.");
          })
          .finally(() => {
      //card.checkLikeStatus(res.isLiked, res.cardData);
            card.checkLikeStatus(res.isLiked, res.cardData);
            //cardElement.toggleLikeIcon(isLiked);
          })
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
  const { avatar, name, description} = editUserInfo.getUserAvatarInfo();

  profileAvatarUrlInput.value = avatar;
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;

  updateAvatarPopup.open();
}); 



//PRACTISE API


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

