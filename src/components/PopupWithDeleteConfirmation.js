import Popup from "./Popup";
import { config } from "../utils/utils";

export default class PopupWithDeleteConfirmation extends Popup {
  constructor(popupSelector, handleDeleteSubmit, handleConfirmDeleteSubmit) {
    super(popupSelector);
    this._handleConfirmDeleteSubmit = handleConfirmDeleteSubmit;
    this._handleDeleteSubmit = handleDeleteSubmit;

    this._confirmDeleteButton = this._popupElement.querySelector(
      "#confirm-delete-button"
    );
  }
  //   this._submitButtonSelector = this._element.querySelector(".modal__button");
  // }

  setEventListeners() {
    super.setEventListeners();
    this._confirmDeleteButton.addEventListener("click", () => {
      this._handleConfirmDeleteSubmit();
    });
  }

  open() {
    super.open();
    //  this._popupElement.addEventListener("click", this._handleDeleteSubmit);
  }

  close() {
    super.close();
    // this._popupElement.removeEventListener("submit", this._handleDeleteSubmit);
  }

  // _handleConfirmDelete() {
  //   console.log("THIS ONE IS WORKING");
  //   this._handleDeleteSubmit();
  //   this.close();
  // }

  // handleDeleteSubmithere() {
  //   // this._element.remove();
  //   // this._element = null;
  //   console.log("handleDeleteCard clicked");
  // }

  // _handleDeleteCard = () => {
  // this._element.remove();
  // this._element = null;
  // console.log("handleDeleteCard clicked");
  // };
  //   super.setEventListeners();

  //   this._confirmDeleteButton.addEventListener("click", () => {
  //     super.close();
  //   });
  // }
}
