import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__content');
    this._handleSubmitForm = handleSubmitForm;
    // this._cardId = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._cardId, this._card); // Передаем идентификатор карточки в обработчик формы
    });
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
    console.log(this._cardId);
  }
}