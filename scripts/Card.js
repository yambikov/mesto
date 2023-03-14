/*
Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
- принимает в конструктор её данные и селектор её template-элемента;
- содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
- содержит приватные методы для каждого обработчика;
- содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
 */

class Card {

//static _template = document.querySelector('#template').content;


  constructor(selectors, cardTemplate, openPopup, popupImageImg, popupImageCaption, initialCards, item) {
    this._selectors = selectors;
    this._cardTemplate = cardTemplate;
    this._openPopup = openPopup;
    this._popupImageImg = popupImageImg;
    this._popupImageCaption = popupImageCaption;
    this._initialCards = initialCards;
    this._template = document.querySelector(selectors.template).content;
    this._item = item;

  }
  
  /*
  _getTemplate() {
    const template = document.querySelector('#template').content.querySelector(this._cardTemplate);
    
    return template;
  }*/


  renderCard() {
    //console.log(this._item)
    const card = this._template.cloneNode(true);
    const buttonLike = card.querySelector(this._selectors.cardLikeBtn);

    card.querySelector(this._selectors.cardImage).src = this._initialCards.link;
    card.querySelector(this._selectors.cardTitle).textContent = this._initialCards.name;
    card.querySelector(this._selectors.cardImage).alt = this._initialCards.name;
  
    // remove
    card.querySelector(this._selectors.cardRemoveBtn).addEventListener('click', () => {
      card.remove()
    });
  
    //like
    buttonLike.addEventListener('click', () => {
      buttonLike.classList.toggle(this._selectors.cardLikeActive);
    });
  
    //image
    card.querySelector(this._selectors.cardImage).addEventListener('click', () => {
      this._popupImageImg.src = this._initialCards.link;
      this._popupImageImg.alt = this._initialCards.name;
      this._popupImageCaption.textContent = this._initialCards.name;
      this._openPopup(popupImage);
    });
  
    //console.log(card);
    return card;
  }
  
  getInfo() {
    //console.log(this);
    //console.log(this._initialCards.link);
    console.log(this._item[1])
  }
};

export default Card;