export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //array of items to be rendered within the section
    this._renderer = renderer; //object that has a poperty called renderer thats equal to a function, basically function passing the item as a n argument
    this._container = document.querySelector(containerSelector); //selecct container element where the section will be appended
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
    this._container.prepend(element); //element of section area where item will be posted to
  }
}
