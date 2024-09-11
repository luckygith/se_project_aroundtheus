import Popup from "./Popup";

export default class UserInfo {
  constructor({ titleSelector, occupationSelector, avatarSelector }) {
    this._profileTitleElement = document.querySelector(titleSelector);
    this._profileDescriptionElement =
      document.querySelector(occupationSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);

  }

  //const imageUrl = document.getElementById("update-avatar-modal").src;

  

  getUserInfo() {
    // Returns an object containing information about the user

    // const inputValues = {
    return {
      name: this._profileTitleElement.textContent,
      description: this._profileDescriptionElement.textContent,
    };

    // return inputValues;
  }

  setUserInfo({ name, about }) {
    // const { name, description } = this.getUserInfo(inputValues);

    this._profileTitleElement.textContent = name;
    this._profileDescriptionElement.textContent = about;
  }

getUserAvatarInfo() {

return {
  avatar: this._profileAvatarElement.src,
  name: this._profileTitleElement.textContent,
  description: this._profileDescriptionElement.textContent,

}   


}

setUserAvatarInfo({avatar, name, description}) {
  
  this._profileAvatarElement.src = avatar;
  this._profileTitleElement.textContent = name,
  this._profileDescriptionElement.textContent = description,


}

}

