class FormValidator {

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


  _showInputError(input, errorMessage) {
    input.classList.add(this._inputErrorClass);
    errorMessage.textContent = input.validationMessage;
  };


  _hideInputError(input, errorMessage) {
    input.classList.remove(this._inputErrorClass);
    errorMessage.textContent = '';
  };


  _toggleButtonState() {
    
    if (this._hasInvalidInput()) {
      this._formButton.classList.add(this._disabledButtonClass);
      this._formButton.disabled = true;
      

    } else {
      this._formButton.classList.remove(this._disabledButtonClass);
      this._formButton.disabled = false;
    }
  };




  _handleFormInput(input) {
    const errorMessage = this._formElement.querySelector(`.input-error-${input.name}`);

    if (input.validity.valid) {
      this._hideInputError(input, errorMessage);
    } else {
      this._showInputError(input, errorMessage);
    }
  };


  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  };


  _setEventListeners() {
    this._formButton.classList.add(this._disabledButtonClass);
    this._formButton.disabled = true;


    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._handleFormInput(input);
        this._toggleButtonState(this._hasInvalidInput());
      });
    });
  }


  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }


}


export default FormValidator