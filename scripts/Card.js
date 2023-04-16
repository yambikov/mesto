/*
Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
- принимает в конструктор её данные и селектор её template-элемента;
- содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
- содержит приватные методы для каждого обработчика;
- содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
 */



class Card {
  static _template = document.querySelector('#template').content;
  
  constructor(item, selectors, cardTemplate, openPopup, popupImageImg, popupImageCaption, popupImage) {
    this._selectors = selectors;
    this._cardTemplate = cardTemplate;
    this._openPopup = openPopup;
    this._popupImage = popupImage;
    this._popupImageImg = popupImageImg;
    this._popupImageCaption = popupImageCaption;
    this._name = item.name;
    this._link = item.link;

    this._buttonDeleteHandler = this._buttonDeleteHandler.bind(this);
  }

  renderCard() {
    this._card = Card._template.querySelector(this._selectors.cardTemplate).cloneNode(true);

    const cardImageValue = this._card.querySelector(this._selectors.cardImage);
    const cardTitleValue = this._card.querySelector(this._selectors.cardTitle);

    const buttonCardLike = this._card.querySelector(this._selectors.cardLikeBtn);
    const buttonCardRemove = this._card.querySelector(this._selectors.cardRemoveBtn);
    const buttonCardImage = this._card.querySelector(this._selectors.cardImage);
    
    cardImageValue.src = this._link;
    cardImageValue.alt = this._name;
    cardTitleValue.textContent = this._name;

    // remove
    buttonCardRemove.addEventListener('click', this._buttonDeleteHandler());

    // like
    buttonCardLike.addEventListener('click', () => {
      buttonCardLike.classList.toggle(this._selectors.cardLikeActive);
    });

    // image
    buttonCardImage.addEventListener('click', () => {
      this._popupImageImg.src = cardImageValue.src;
      this._popupImageImg.alt = cardImageValue.alt;
      this._popupImageCaption.textContent = cardTitleValue.textContent;
      this._openPopup(this._popupImage);
    });

    return this._card;
  }

  _buttonDeleteHandler() {
    this._card.remove();
  }
}


export default Card;