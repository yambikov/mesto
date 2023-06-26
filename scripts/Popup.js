export default class Popup {
  constructor(popupSelector /*'.popup'*/) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-icon');
    //this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._closeButton.addEventListener('click', this._handleCloseButtonClick);
    this._popup.addEventListener('click', this._handlePopupClick);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._closeButton.removeEventListener('click', this._handleCloseButtonClick);
    this._popup.removeEventListener('click', this._handlePopupClick);
  }

  _handleCloseButtonClick = () => {
    this.close();
  }

  _handlePopupClick = (evt) => {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
