/*
Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
- принимает в конструктор её данные и селектор её template-элемента;
- содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
- содержит приватные методы для каждого обработчика;
- содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
 */

class Card {

  constructor(selectors, cardTemplate, openPopup, popupImageImg, popupImageCaption, initialCards) {
    this._selectors = selectors;
    this._cardTemplate = cardTemplate;
    this._openPopup = openPopup;
    this._popupImageImg = popupImageImg;
    this._popupImageCaption = popupImageCaption;
    this._initialCards = initialCards;
  }
  
  _getTemplate() {
    const cardTemplate = document.querySelector('#template').content.querySelector(this._cardTemplate);
    return cardTemplate;
  }


  renderCard() {
    const card = this._getTemplate().cloneNode(true);
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
  
    console.log(card);
    return card;
  }
  
  

  getInfo() {
    console.log(this);
    //console.log(_getTemplate);
  }
};

export default Card;