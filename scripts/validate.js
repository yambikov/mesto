class FormValidator {
  constructor(formData, formElement) {
    this._formElement = formElement;
    this._inputSelector = formData.inputSelector;
    this._inputErrorClass = formData.inputErrorClass;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
  };

  _hideInputError(inputElement, errorMessage) {
    inputElement.classList.remove(this._inputErrorClass);
    errorMessage.textContent = '';
  };

  _toggleButtonState(formButton, formButtonDisabled) {
    formButton.classList.toggle(this._inactiveButtonClass, formButtonDisabled);
  };
  

  _checkInputValidity (inputElement) { 
    const errorMessage = this._formElement.querySelector(`.input-error-${inputElement.name}`);
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorMessage);
    } else {
      this._showInputError(inputElement, errorMessage);
    }
  };

  _hasInvalidInput (inputs) {
    return inputs.some((input) => !input.validity.valid);
  };

  _handleFormInput() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    const formButton = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(formButton, this._hasInvalidInput(inputs));

    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {

        this._checkInputValidity(inputElement);

        this._toggleButtonState(formButton, this._hasInvalidInput(inputs));
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._handleFormInput();
  }
}


export default FormValidator