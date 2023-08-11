export default class FormValidator {

  constructor(formData, formElement) {

    this._formData = formData;
    this._formElement = formElement;
    this._inputSelector = formData.inputSelector;
    this._inputErrorClass = formData.inputErrorClass;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._disabledButtonClass = formData.inactiveButtonClass;
    this._formButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));

  }

  // Вкл. ошибку добавляя класс input-error-name к span
  _showInputError(input, errorMessage) {
    input.classList.add(this._inputErrorClass);
    errorMessage.textContent = input.validationMessage;
  };

  // Выкл. ошибку удаляя класс из span
  _hideInputError(input, errorMessage) {
    console.log(input);
    input.classList.remove(this._inputErrorClass);
    console.log(this._inputErrorClass);
    errorMessage.textContent = '';
  };

  // Переключатель кнопки (вкл./выкл.)
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
  
  // Включение кнопки
  _enableButton() {
    this._formButton.classList.remove(this._disabledButtonClass);
    this._formButton.disabled = false;
  }
  
  // Отключение кнопки
  _disableButton() {
    this._formButton.classList.add(this._disabledButtonClass);
    this._formButton.disabled = true;
  }

  // Переключатель сообщения об ошибке (вкл./выкл.)
  _handleFormInput(input) {
    const errorMessage = this._formElement.querySelector(`.input-error-${input.name}`);
    if (input.validity.valid) {
      this._hideInputError(input, errorMessage);
    } else {
      this._showInputError(input, errorMessage);
    }
  };

  // Поиск в массиве полей ввода невалидного поля
  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  };

  // Вешаем слушателей
  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._handleFormInput(input);
        this._toggleButtonState();
      });
    });
  }

  // Включаем валидацию
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  // Сбрасываем ошибки и выключаем кнопку
  resetValidation() {
    this._inputs.forEach((input) => {
      const errorMessage = this._formElement.querySelector(`.input-error-${input.name}`);
      this._hideInputError(input, errorMessage);

      input.value = '';
    });

    this._disableButton();
  }

}
