export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose = (evt) => {
    this._overlay = evt.target.classList.contains('popup');
    this._closeBtn = evt.target.classList.contains('popup__close-btn');
    if (this._overlay || this._closeBtn) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    document.addEventListener('click', this._handleClickClose);
    // document.addEventListener('keydown', this._handleEscClose);
  }
}