export default class Card {
  constructor(data, handleCardClick, cardTemplate, openPopupWithConfirm, userID) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._like = data.likes.length;
    this._id = data.owner._id;
    this._userId = userID;
    this._cardId = data._id
    this._card = this

    this._handleCardClick = handleCardClick; // Функция обработчик клика по карточке
    this._openPopupWithConfirm = openPopupWithConfirm;
    this.cardTemplate = cardTemplate; // Шаблон разметки карточки
  }
// показать/скрыть иконку удаления
  _checkId() {
    this._buttonRemove = this._element.querySelector('.element__remove');

    if (this._id !== this._userId) {
      this._buttonRemove.remove();
    }
  }

  // Возвращает DOM-элемент карточки, созданный на основе шаблона
  _getTemplate() {
    const template = this.cardTemplate
      .content.querySelector('.element')
      .cloneNode(true);

    return template;
  }

  // Удаляет карточку из DOM
  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
    // console.log(this._cardId)
  }

  // Переключает статус лайка на карточке
  _handleLikeButton() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  // Открывает попап с картинкой карточки
  _openPopupImage() {
    this._handleCardClick(this._data); // Вызываем функцию обработчик для открытия попапа с картинкой карточки
  }

  // Открывает попап с подтверждением удаления
  _openPopupWithDelete() {
    this._openPopupWithConfirm.open(this._cardId, this._card); 
    // console.log((this._cardId));// Передайте идентификатор карточки в попап
  }
  

  // Устанавливает слушатели событий для карточки
  _setEventListeners() {
    this._buttonRemove.addEventListener('click', () => {
      this._openPopupWithDelete();
      // this._handleDeleteButton(); // Вызываем метод удаления карточки
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeButton(); // Вызываем метод переключения статуса лайка
    })

    this._cardImage.addEventListener('click', () => {
      this._openPopupImage() // Вызываем метод открытия попапа с картинкой
    })
  }

  // Создает и возвращает DOM-элемент карточки с заполненными данными
  generateCard() {
    this._element = this._getTemplate();

    this._checkId();

    this._buttonLike = this._element.querySelector('.element__like');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._likeContainer = this._element.querySelector('.element__like-counter')

    this._setEventListeners();

    this._cardImage.src = this._link; // Устанавливаем изображение карточки
    this._cardTitle.textContent = this._name; // Устанавливаем заголовок карточки
    this._cardImage.alt = this._name; // Устанавливаем альтернативный текст для изображения
    this._likeContainer.textContent = this._like

    return this._element;
  }
}
