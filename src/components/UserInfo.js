import Popup from "./Popup";

export default class UserInfo {
  constructor({ titleSelector, occupationSelector, avatarSelector }) {
    this._profileTitleElement = document.querySelector(titleSelector);
    this._profileDescriptionElement =
      document.querySelector(occupationSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);

    //this._submitButtonSelector = config.submitButtonSelector;
    //this._handleSavingButton = handleSavingButton;
  }

  // const imageUrl = document.getElementById("update-avatar-modal").src;

  

  getUserInfo() {
    // Returns an object containing information about the user

    // const inputValues = {
    return {
      name: this._profileTitleElement.textContent,
      description: this._profileDescriptionElement.textContent,
      avatar: this._profileAvatarElement.value,
    };

    // return inputValues;
  }

  setUserInfo({ name, description, avatar }) {
    // const { name, description } = this.getUserInfo(inputValues);

     // const submitButton = document.querySelector(".modal__button");
    // submitButton.innerHTML = "Saving...";

    this._profileTitleElement.textContent = name;
    this._profileDescriptionElement.textContent = description;
    this._profileAvatarElement.value = avatar;
  }

getUserAvatarInfo() {

return {
  avatar: this._profileAvatarElement.value,
  // name: this._profileTitleElement.textContent,
  // description: this._profileDescriptionElement.textContent,

}   

modalImage.src = cardData.link;


}

setUserAvatarInfo({avatar}) {
  
  this._profileAvatarElement.src = avatar;
  // this._profileTitleElement.textContent = name;
  // this._profileDescriptionElement.textContent = description;
}

getViewUserInfo(userInfo) {

  console.log("getViewUserInfo accessed");
  console.log(userInfo);

this.setUserInfo({
  name: userInfo.name,
  description: userInfo.about,
  avatar: userInfo.avatar,
})
return this._profileTitleElement
}

// return {
//   avatar: this._profileAvatarElement.src,
//   name: this._profileTitleElement.value,
//   description: this._profileDescriptionElement.value,
// ({

// }  
}
