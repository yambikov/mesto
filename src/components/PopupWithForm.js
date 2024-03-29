import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputs = Array.from(this._form.querySelectorAll('.popup__item'));
    this._submitBtn = this._form.querySelector('.popup__button');

    this._submitBtnText = this._submitBtn.textContent

    
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  // loadingStatus() {
  //   this._popupButton.value = 'Сохранение...';
  //   this._popupButton.disabled = true; // Отключаем кнопку во время загрузки
  // }

  // Получает значения всех полей ввода формы
  _getInputValues() {
    this._formData = {};
    this._inputs.forEach(input => {
      this._formData[input.name] = input.value;
    });

    return this._formData;
  }

  // Добавляет значения полей при открытии попапа редактирования профиля
  setInputValues(data) {
    this._inputs.forEach(input => {
      input.value = data[input.name]
    });
  }

  // Устанавливает слушатели событий
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  // Удаляет слушатели событий
  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._handleFormSubmit);
  }

  // Обработчик события отправки формы
  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    // this.loadingStatus();
    this._handleSubmitForm(this._getInputValues());
  }

  // Закрывает попап и сбрасывает значения полей формы
  close() {
    super.close();
    this._form.reset();
    // this._submitBtn.disabled = false;
    // this._popupButton.value = 'Сохранить';
  }
}
