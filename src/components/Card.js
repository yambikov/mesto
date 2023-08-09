export default class Card {
  constructor(data, handleCardClick, cardTemplate, openPopupWithConfirm, userID) {
    // Инициализация свойств карточки из переданных данных и параметров
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._like = data.likes.length;
    this._likes = data.likes;
    this._id = data.owner._id;
    this._userId = userID;
    this._cardId = data._id;
    this._card = this;

    // Сохранение переданных функций и шаблона карточки
    this._handleCardClick = handleCardClick; // Функция обработчик клика по карточке
    this._openPopupWithConfirm = openPopupWithConfirm;
    this.cardTemplate = cardTemplate; // Шаблон разметки карточки
    this.likesCount = data.likes.length; // Кол-во лайков
  }

  isLikedByUser() {
    return this._likes.some(like => like._id === this._userId);
  }

  activateLike() {
    this._buttonLike.classList.add('element__like_active');
  }

  deactivateLiked() {
    this._buttonLike.classList.remove('element__like_active');
  }

  // Возвращает DOM-элемент карточки, созданный на основе шаблона
  _getTemplate() {
    const template = this.cardTemplate
      .content.querySelector('.element')
      .cloneNode(true);

    return template;
  }

  // Удаляет карточку из DOM
  removeCard() {
    this._element.remove();
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
  }

  // Устанавливает слушатели событий для карточки
  _setEventListeners() {
    this._buttonRemove.addEventListener('click', () => {
      this._openPopupWithDelete(); //
    });

    this._buttonLike.addEventListener('click', () => {
      // this._handleLikeButton(); // Вызываем метод переключения статуса лайка
      console.log('like');
    });

    this._cardImage.addEventListener('click', () => {
      this._openPopupImage(); // Вызываем метод открытия попапа с картинкой
    });
  }

   // Показать/скрыть иконку удаления в зависимости от владельца карточки
   _hideRemoveButton() {
    this._buttonRemove = this._element.querySelector('.element__remove');

    if (this._id !== this._userId) {
      this._buttonRemove.remove();
    }
  }

  // Создает и возвращает DOM-элемент карточки с заполненными данными
  generateCard() {
    this._element = this._getTemplate();

    this._hideRemoveButton();

    this._buttonLike = this._element.querySelector('.element__like');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._likeContainer = this._element.querySelector('.element__like-counter');

    this._setEventListeners();

    this._cardImage.src = this._link; // Устанавливаем изображение карточки
    this._cardTitle.textContent = this._name; // Устанавливаем заголовок карточки
    this._cardImage.alt = this._name; // Устанавливаем альтернативный текст для изображения
    this._likeContainer.textContent = this.likesCount; // Устанавливаем кол-во лайков

    if (this.isLikedByUser()) {
      this.activateLike(); // Карточка лайкнута
    } else {
      this.deactivateLiked(); // Карточка не лайкнута
    }

    return this._element;
  }
}
