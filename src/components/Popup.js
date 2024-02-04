export default class Popup {
  //exportdefault is the parent of Popupwith form and with image
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this); //ASK
    this._closeButton = document.querySelector(".modal__close");
  }

  open() {
    //opens popup
    document.addEventListener("keydown", this._handleEscapeClose);
    this._popupElement.classList.add("modal_opened");
    this._closeButton.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("click", (event) =>
      this.closeModalOnClick(event)
    );
  }

  close() {
    //closes popup
    document.removeEventListener("keydown", this._handleEscapeClose);
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscapeClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  closeModalOnClick(event) {
    //CLOSES MODAL VIA MODAL BACKGROUND

    if (event.target === this._popupElement) {
      this.close();
    }
  }
}
