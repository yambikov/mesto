import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector); // Вызываем конструктор родительского класса с переданным селектором попапа
    this._form = this._popup.querySelector('.popup__content'); // Получаем ссылку на форму внутри попапа
    this._handleSubmitForm = handleSubmitForm; // Сохраняем переданный метод для обработки формы
    this._cardId = null; // Идентификатор карточки, который будет использоваться при подтверждении (изначально null)
  }

  // Метод для добавления обработчиков событий
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitSubmit); // Добавляем обработчик события submit для формы
  }

  // Метод для удаления обработчиков событий
  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._handleSubmitSubmit); // Удаляем обработчик события submit
  }

  // Приватный метод, вызывается при отправке формы
  _handleSubmitSubmit = (evt) => {
    evt.preventDefault();
    this._handleSubmitForm(this._cardId, this._card); // Вызываем переданный метод для обработки формы с передачей идентификатора и карточки
  }

  // Метод для открытия попапа с передачей идентификатора и карточки
  open(cardId, card) {
    super.open();
    this._cardId = cardId; // Сохраняем переданный идентификатор карточки
    this._card = card; // Сохраняем переданную карточку
  }

  // Метод для закрытия попапа
  close() {
    super.close();
    this._cardId = null; // Обнуляем значение идентификатора карточки при закрытии попапа
  }
}
