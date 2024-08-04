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

  setUserInfo({ name, about }) {
    // const { name, description } = this.getUserInfo(inputValues);

    this._profileTitleElement.textContent = name;
    this._profileDescriptionElement.textContent = about;
  }
}

