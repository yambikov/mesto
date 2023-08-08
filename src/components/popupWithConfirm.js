import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__content');
    this._handleSubmitForm = handleSubmitForm;
    this._cardId = null; // Начальное значение для _cardId
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitSubmit); // Используем отдельный метод для обработки submit
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._handleSubmitSubmit);
  }

  _handleSubmitSubmit = (evt) => {
    evt.preventDefault();
    this._handleSubmitForm(this._cardId, this._card);
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  close() {
    super.close();
    this._cardId = null; // Обнуляем _cardId при закрытии попапа
  }
}
