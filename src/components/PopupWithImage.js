import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._popupElement = document.querySelector(
    //   `${popupSelector} #previewImageModal`
    //);
    this._modalImage = document.querySelector(".modal__image");
    this._modalText = document.querySelector(".modal__text");
  }

  open({ name, link }) {
    this._modalImage.alt = name;
    this._modalImage.src = link;
    this._modalText.textContent = name;
    super.open();
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });
    super.setEventListeners();
  }
}
