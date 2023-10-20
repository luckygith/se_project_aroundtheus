const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountians",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

const modal = document.querySelector(".modal");

//buttons
const profileEditButton = document.querySelector("#profile-edit-button"); //storing edit button inside this variable
const profileCloseModalButton = document.querySelector(
  "#profile-close-modalButton"
);

const addNewCardButton = document.querySelector("#profile-add-button"); //new modal
const addNewCardClose = document.querySelector("#card-close-modal-button");

//elements
const addNewCardModal = document.querySelector("#add-card-modal");
const profileEditModal = document.querySelector("#profile-edit-modal"); //instead of using identical yet confusing paired class names we create an id
const profileTitle = document.querySelector(".profile__title "); //target id on HTML and create variable on JS
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

const profileEditForm = profileEditModal.querySelector(".modal__form_profile");
const cardEditForm = addNewCardModal.querySelector(".modal__form_card");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListElement = document.querySelector(".cards__list");

//functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

/*function ProfileEditButtonOpen() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent; //preset value input to what is already occupying input value
  profileEditModal.classList.add("modal_opened");
}
/* REFACTORED 
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent; //preset value input to what is already occupying input value
  profileEditModal.classList.add("modal_opened");
});*/

//function openProfileModal() {
//modal.classList.add("modal_opened");
//}

/*function ProfileEditButtonOpen() {
  openProfileModal(profileEditModal);
}*/

//event handlers
function getCardElement(cardData) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardData.name);

  const cardImageElement = cardElement.querySelector(".cards__image");
  const cardTitleElement = cardElement.querySelector(".cards__title");

  const likeButton = cardElement.querySelector(".cards__like-button");

  //find delete button
  //add event listener to delet button
  //card element.remove();
  //add click listener to the card image element
  //openModal with previewImageModal

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });

  cardImageElement.src = cardData.link;
  //set the image alt text to the name field of the object
  cardImageElement.alt = cardData.name;
  //set the card title to the name field of the object, too
  cardTitleElement.textContent = cardData.name;

  //return the ready HTML element with the filled-in data
  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = CardUrlInput.value;
  renderCard({ name, link }), cardsWrap;
  closeModal(addNewCardModal);
}

initialCards.forEach((cardData) => {
  //forEach
  const cardElement = getCardElement(cardData); //create variable the includes function and item cardData
  cardListElement.prepend(cardElement); //add to DOM
});
/*for (let i = 0; i < initialCards.length; i++) {
  const card = initialCards[i];
  forLoop version
}*/

//event listeners
//("click" => openProfileModal(profileEditModal));

profileCloseModalButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent; //preset value input to what is already occupying input value
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardEditForm.addEventListener("submit", handleAddCardSubmit);
//add new card
addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));
addNewCardClose.addEventListener("click", () => closeModal(addNewCardModal));

/*const likeButtons = document.querySelectorAll(".cards__like-button");
likeButtons.forEach((likeButton) => {});
likeButton.addEventListener("click", () => {
  likeButton.classList.toggle("cards__like-button_active");
});*/
