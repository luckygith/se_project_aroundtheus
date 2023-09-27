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

//functions
function closePopup() {
  profileEditModal.classList.remove("modal__opened");
}

//event handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  //console.log("form submitted");
  profileTitle.textContent = profileTitleInput.value; //setting text to exactly what is already preset
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

//event listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent; //preset value input to what is already occupying input value
  profileEditModal.classList.add("modal__opened");
});

profileCloseModalButton.addEventListener("click", () => {
  closePopup();
});

console.log(profileDescription.textContent);

console.log(profileDescription.textContent);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
