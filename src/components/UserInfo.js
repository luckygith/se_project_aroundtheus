import Popup from "./Popup";

export default class UserInfo {
  constructor({ titleSelector, occupationSelector }) {
    this._profileTitleElement = document.querySelector(titleSelector);
    this._profileDescriptionElement =
      document.querySelector(occupationSelector);
  }

  getUserInfo() {
    // Returns an object containing information about the user

    // const inputValues = {
    return {
      name: this._profileTitleElement.textContent,
      description: this._profileDescriptionElement.textContent,
    };

    // return inputValues;
  }

  setUserInfo({ name, description }) {
    // const { name, description } = this.getUserInfo(inputValues);
    console.log("setUSER WORKING");
    this._profileTitleElement.textContent = name;
    this._profileDescriptionElement.textContent = description;
  }
}

// profileTitleInput.value = profileTitle.textContent;
// profileDescriptionInput.value = profileDescription.textContent;
// profileUserInfo.setUserInfo(data);
