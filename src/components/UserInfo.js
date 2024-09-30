import Popup from "./Popup";

export default class UserInfo {
  constructor({ titleSelector, occupationSelector, avatarSelector }) {
    this._profileTitleElement = document.querySelector(titleSelector);
    this._profileDescriptionElement =
      document.querySelector(occupationSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    // Returns an object containing information about the user

    return {
      name: this._profileTitleElement.textContent,
      description: this._profileDescriptionElement.textContent,
      avatar: this._profileAvatarElement.src,
    };

    // return inputValues;
  }

  setUserInfo({ name, description, avatar }) {
    this._profileTitleElement.textContent = name;
    this._profileDescriptionElement.textContent = description;
    this._profileAvatarElement.src = avatar;
  }

  getUserAvatarInfo() {
    return {
      avatar: this._profileAvatarElement.src,
    };

    modalImage.src = cardData.link;
  }

  setUserAvatarInfo({ avatar }) {
    this._profileAvatarElement.src = avatar;
  }

  getViewUserInfo(userInfo) {
    console.log("getViewUserInfo accessed");
    console.log(userInfo);

    this.setUserInfo({
      name: userInfo.name,
      description: userInfo.about,
      avatar: userInfo.avatar,
    });
    return this._profileTitleElement;
  }
}
