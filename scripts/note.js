class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorMessages = settings.errorMessages;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement);
    }
  }

  _toggleButtonState() {
    if (this._formElement.checkValidity()) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}

////////////////


const formElement = document.querySelector('#my-form');
const validator = new FormValidator({
  formSelector: '#my-form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_error',
  errorMessages: {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    tooLong: 'Должно быть от 2 до 30 символов',
    typeMismatch: 'Здесь должна быть ссылка',
  },
}, formElement);
validator.enableValidation();
