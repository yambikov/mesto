export default class Popup {
  constructor(popupSelector /*'.popup'*/) {
    this._popup = document.querySelector(popupSelector);
    console.log(this._popup);
    this._closeButton = this._popup.querySelector('.popup__close-icon');
    //this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    console.log(this._popup)
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
