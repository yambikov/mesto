class Card {
  constructor(data, openImage, cardTemplate) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._openImage = openImage;
    this.cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const template = this.cardTemplate
      .content.querySelector('.element')
      .cloneNode(true);

    return template;
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

    this._element.querySelector('.element__remove').addEventListener('click', () => {
      this._handleDeleteButton();  // remove
    });
    
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeButton(); //like
    })

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupImage() //image
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }
}


export default Card