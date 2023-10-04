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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListElement = document.querySelector(".cards__list");

//functions
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

//event handlers
function getCardElement(cardData) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardData.name);
  //access the card title and image and store them in variables
  const cardImageElement = cardElement.querySelector(".cards__image");
  const cardTitleElement = cardElement.querySelector(".cards__title");
  console.log(cardImageElement);
  //set the path to the image to the link field of the object
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
  closePopup();
}

//event listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent; //preset value input to what is already occupying input value
  profileEditModal.classList.add("modal_opened");
});

profileCloseModalButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/*for (let i = 0; i < initialCards.length; i++) {
  const card = initialCards[i];
}*/

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
});
