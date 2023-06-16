export default class Section {
  constructor({ items /* initialCards */, renderer/* function createCard */ }, selector /* cardsContainer */) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  addItem(element) /* element — результат работы метода generateCard класса Card */ {
    this._container.prepend(element);
  }
};