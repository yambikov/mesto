class Card {
  constructor(data, openImage) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._openImage = openImage;
  }

  _getTemplate() {
    const cardTemplate = document
      .getElementById('template')
      .content.querySelector('.element')
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _handleLikeButton() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _openPopupImage() {
    this._openImage(this._data);
  }

  _setEventListeners() {

    // remove
    this._element.querySelector('.element__remove').addEventListener('click', () => {
      this._handleDeleteButton();
    });

    //like
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeButton();
    })

    //image
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupImage()
    })
  }
}


export { Card }