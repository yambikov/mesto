// Функция показа ошибки ввода
const showInputError = (inputElement, errorElement, inputErrorClass) => {
  // Добавляет класс ошибки к полю ввода
  inputElement.classList.add(inputErrorClass);
  // Устанавливает текст ошибки
  errorElement.textContent = inputElement.validationMessage;
};

// Функция скрытия ошибки ввода
const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  // Удаляет класс ошибки из поля ввода
  inputElement.classList.remove(inputErrorClass);
  // Очищает текст ошибки
  errorElement.textContent = '';
};

// Функция изменения состояния кнопки отправки формы
const toggleButtonState = (formSubmitButtonElement, inactiveButtonClass, buttonState) => {
  // Изменяет наличие класса неактивной кнопки
  formSubmitButtonElement.classList.toggle(inactiveButtonClass, buttonState);
  // Устанавливает состояние отключенной кнопки
  formSubmitButtonElement.disabled = buttonState;
};

// Функция проверки валидности поля ввода
const checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
  // Проверяет валидность поля ввода
  if (inputElement.validity.valid) {
    // Если валидное, скрывает ошибку
    hideInputError(inputElement, errorElement, inputErrorClass);
  } else {
    // Если невалидное, показывает ошибку
    showInputError(inputElement, errorElement, inputErrorClass);
  }
};

// Функция проверки наличия невалидного ввода
const hasInvalidInput = (inputs) => {
  // Проверяет наличие невалидного ввода в списке полей ввода
  return inputs.some((input) => !input.validity.valid);
};

// Функция обработки события ввода в поле формы
const handleFormInput = (evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs, inputElement) => {
  // Находит элемент ошибки ввода
  const errorElement = form.querySelector(`.input-error-${inputElement.name}`);

  // Проверяет валидность поля ввода и изменяет состояние кнопки отправки формы
  checkInputValidity(inputElement, errorElement, inputErrorClass);
  toggleButtonState(formSubmitButtonElement, inactiveButtonClass, hasInvalidInput(inputs));
};

// Функция включения валидации формы
const enableValidation = ({ formSelector, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass }) => {
  // Находит все формы по селектору
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Для каждой формы настраивает валидацию
  formList.forEach((form) => {
    // Находит все поля ввода в форме
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    // Находит кнопку отправки формы
    const formSubmitButtonElement = form.querySelector(submitButtonSelector);

    // Изменяет состояние кнопки отправки формы в начале
    toggleButtonState(formSubmitButtonElement, inactiveButtonClass, hasInvalidInput(inputs));

    // Добавляет обработчики событий input для каждого поля ввода
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => handleFormInput(evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs, inputElement));
    });
  });
};

// Включает валидацию формы с заданными параметрами
enableValidation({
  formSelector: '.popup__content',
  inputSelector: '.popup__item',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled'
});
