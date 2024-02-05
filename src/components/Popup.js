export default class Popup {
  //exportdefault is the parent of Popupwith form and with image
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this); //ASK
    this._closeButton = this._popupElement.querySelector(".modal__close");
    this._closeModalOnClick = this._closeModalOnClick.bind(this);
    this._handleModalBackgroundClick =
      this._handleModalBackgroundClick.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeClose);
    document.addEventListener("click", this._handleModalBackgroundClick);
    this._closeButton.addEventListener("click", this._closeModalOnClick);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscapeClose);
    document.removeEventListener("click", this._handleModalBackgroundClick);
    this._closeButton.removeEventListener("click", this._closeModalOnClick);
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscapeClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleModalBackgroundClick(event) {
    if (event.target === this._popupElement) {
      this.close();
    }
  }

  _closeModalOnClick() {
    this.close();
  }
}
// console.log("Background listener on");
// console.log("Event target:", event.target);
// console.log("this._popupElement:", this._popupElement);
