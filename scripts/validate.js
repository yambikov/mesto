const showInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (inputElement, errorElement) => {
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};

const toggleButtonState = (formSubmitButtonElement, inactiveButtonClass, buttonState) => {
  formSubmitButtonElement.classList.toggle(inactiveButtonClass, buttonState);
  formSubmitButtonElement.disabled = buttonState;
};

const checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, inputErrorClass);
  } else {
    showInputError(inputElement, errorElement, inputErrorClass);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
};

const handleFormInput = (evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs) => {
  const inputElement = evt.target;
  const errorElement = form.querySelector(`.input-error-${inputElement.name}`);
  checkInputValidity(inputElement, errorElement, inputErrorClass);
  toggleButtonState(formSubmitButtonElement, inactiveButtonClass, hasInvalidInput(inputs));
};

const handleFormSubmitNew = (evt) => {
  evt.preventDefault();
};

const enableValidation = ({ inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass }) => {
  const formList = Array.from(document.querySelectorAll('form'));
  formList.forEach((form) => {
    form.addEventListener('submit', handleFormSubmitNew);
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const formSubmitButtonElement = form.querySelector(submitButtonSelector);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => handleFormInput(evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs));
    });
  });
};


enableValidation({
  formSelector: '.popup__content',
  inputSelector: '.popup__item',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled'
});
