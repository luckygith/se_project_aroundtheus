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

//elements
const profileEditButton = document.querySelector("#profile-edit-button"); //storing edit button inside this variable
const profileEditModal = document.querySelector("#profile-edit-modal"); //instead of using identical yet confusing paired class names we create an id
//console.log(profileEditButton);

const profileTitle = document.querySelector(".profile__title "); //target id on HTML and create variable on JS
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");

const profileCloseModalButton = document.querySelector(
  "#profile-close-modalButton"
);

/*
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector(".card__list");
*/

//functions
function closePopup() {
  profileEditModal.classList.remove("modal__opened");
}

//event handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

//event listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent; //preset value input to what is already occupying input value
  profileEditModal.classList.add("modal__opened");
});

profileCloseModalButton.addEventListener("click", closePopup);

//clone the template element with all its content and store it in a cardElement variable
//access the card title and image and store them in variables
//set the path to the image to the link field of the object
//set the image alt text to the name field of the object
//set the card title to the name field of the object, too
//return the ready HTML element with the filled-in data

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/*for (let i = 0; i < initialCards.length; i++) {
  const card = initialCards[i];
}*/

/*
initialCards.forEach((cardData) => {
  console.log(cardData.name);
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");

  cardTitleEl.testContent = cardData.name;
  //return cardElement;
  // cardListEl.append(cardElement);
});
*/
