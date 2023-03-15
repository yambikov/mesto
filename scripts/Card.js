/*
Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
- принимает в конструктор её данные и селектор её template-элемента;
- содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
- содержит приватные методы для каждого обработчика;
- содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
 */

class Card {
  constructor(selectors, cardTemplate, openPopup, popupImageImg, popupImageCaption, popupImage, newCard) {
    this._selectors = selectors;
    this._cardTemplate = cardTemplate;
    this._openPopup = openPopup;
    this._popupImage = popupImage;
    this._popupImageImg = popupImageImg;
    this._popupImageCaption = popupImageCaption;
    this._template = document.querySelector(selectors.template).content;
    this.newCard = newCard;
  }

  renderCard(item) {
    const card = this._template.cloneNode(true);
    const buttonLike = card.querySelector(this._selectors.cardLikeBtn);

    card.querySelector(this._selectors.cardImage).src = item.link;
    card.querySelector(this._selectors.cardTitle).textContent = item.name;
    card.querySelector(this._selectors.cardImage).alt = item.name;

    // remove
    card.querySelector(this._selectors.cardRemoveBtn).addEventListener('click', () => {
      //console.log(card);
      //console.log(this);
      console.log(this._cardTemplate)
      this._cardTemplate.remove();


      //this.remove();
    });

    // like
    buttonLike.addEventListener('click', () => {
      buttonLike.classList.toggle(this._selectors.cardLikeActive);
    });

    // image
    card.querySelector(this._selectors.cardImage).addEventListener('click', () => {
      this._popupImageImg.src = item.link;
      this._popupImageImg.alt = item.name;
      this._popupImageCaption.textContent = item.name;
      this._openPopup(this._popupImage);
    });
    //console.log (this);
    return card;
  }
}

export default Card;