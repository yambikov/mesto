export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-icon');
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
    // слушатель по ESC
    document.addEventListener('keydown', this._handleEscClose);
    
    // слушатель по крестику
    this._closeButton.addEventListener('click', this._handleCloseButtonClick);
    
    // слушатель по свободной области
    this._popup.addEventListener('click', this._handlePopupClick);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._closeButton.removeEventListener('click', this._handleCloseButtonClick);
    this._popup.removeEventListener('click', this._handlePopupClick);
  }

  // Обработчик события 'click' по крестику
  _handleCloseButtonClick = () => {
    this.close();
  }

  // Обработчик события 'click' по свободной области
  _handlePopupClick = (evt) => {
    // Если целью события является сам попап, вызываем метод close()
    if (evt.target === this._popup) {
      this.close();
    }
  }

  // Обработчик события 'keydown' по Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
