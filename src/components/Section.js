export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer; //object that has a poperty called renderer thats equal to a function
    this._container = document.querySelector(containerSelector);
  }

  //USE THIS._RENDERER TO CREATE THE ELEMENTS FOR RENDERING
  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  //TAKE THE ITEM AND RENDER IT INTO THIS._ELEMENT
  addItem(element) {
    this._container.prepend(element);
  }
}
