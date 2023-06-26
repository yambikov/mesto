export default class Card {
  constructor(data, handleCardClick /* openImage.open */, cardTemplate) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
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
    this._element = null;
  }

  _handleLikeButton() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _openPopupImage() {
    this._handleCardClick(this._data); //openImage.open(this.data)
  }

  _setEventListeners() {

    this._buttonRemove.addEventListener('click', () => {
      this._handleDeleteButton();  // remove
    });
    
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeButton(); //like
    })

    this._cardImage.addEventListener('click', () => {
      this._openPopupImage() //image
    })
  }

  generateCard() {
    this._element = this._getTemplate();

    this._buttonLike = this._element.querySelector('.element__like');
    this._cardImage = this._element.querySelector('.element__image');
    this._buttonRemove = this._element.querySelector('.element__remove');
    this._cardTitle = this._element.querySelector('.element__title');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;

    return this._element;
  }
}