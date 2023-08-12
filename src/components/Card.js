export default class Card {
  constructor(data, handleCardClick, cardTemplate, openPopupWithConfirm, userID, likeData) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data.owner._id;
    this._userId = userID;
    this._cardId = data._id;
    this._card = this;

    this._handleCardClick = handleCardClick;
    this._openPopupWithConfirm = openPopupWithConfirm;
    this.cardTemplate = cardTemplate;
    this.likesCount = data.likes.length;
    this._handleLikeClick = likeData;


  }

  // метод, который обновляет информацию в DOM при получении её с сервера
  updateLikes(res) {
    this.likesCount = res.likes.length; // происходит замена старого кол-ва лайков на новое
    this._likes = res.likes; // замена старого массива лайков на тот, что получен с сервера после лайка/дислайка
    this._likeContainer.textContent = this.likesCount; // меняем цифру с кол-вом лайков
    this._buttonLike.classList.toggle('element__like_active'); // переключаем активный стиль кнопки лайка

  }

  // Проверка , лайкнул ли пользователь данную карточку
  isLikedByUser = () => {
    const isLiked = this._likes.some(item => item._id === this._userId);
    return isLiked; // true or false 
  }

  // Метод для связки данных с классом Card
  _transferLikes() {
    this._handleLikeClick(this._cardId);
  }

  // Меняет вид кнопки лайка в зависимости от проверки isLikedByUser. Используется при загрзке страницы.
  _handleLikeButton() {
    if (this.isLikedByUser()) {
      this._buttonLike.classList.add('element__like_active');
    } else {
      this._buttonLike.classList.remove('element__like_active');
    }
  }

  _getTemplate() {
    const template = this.cardTemplate
      .content.querySelector('.element')
      .cloneNode(true);

    return template;
  }

  removeCard() {
    this._element.remove();
  }

  _openPopupImage() {
    this._handleCardClick(this._data);
  }

  _openPopupWithDelete() {
    this._openPopupWithConfirm.open(this._cardId, this._card);
  }

  _setEventListeners() {

    this._buttonRemove.addEventListener('click', () => {
      this._openPopupWithDelete();
    });

    this._buttonLike.addEventListener('click', () => {
      this._transferLikes();

    });

    this._cardImage.addEventListener('click', () => {
      this._openPopupImage();
    });
  }

  _hideRemoveButton() {
    this._buttonRemove = this._element.querySelector('.element__remove');

    if (this._id !== this._userId) {
      this._buttonRemove.remove();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like');

    this._hideRemoveButton();

    // this._buttonLike.classList.add('element__like_active');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._likeContainer = this._element.querySelector('.element__like-counter');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._likeContainer.textContent = this.likesCount;

    this._handleLikeButton()

    return this._element;
  }
}
