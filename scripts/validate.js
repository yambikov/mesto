// Функция для показа сообщения об ошибке валидации
const showInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

// Функция для скрытия сообщения об ошибке валидации
const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

// Функция для переключения состояния кнопки
const toggleButtonState = (formSubmitButtonElement, inactiveButtonClass, buttonState) => {
  formSubmitButtonElement.classList.toggle(inactiveButtonClass, buttonState);
  formSubmitButtonElement.disabled = buttonState;
};

// Функция для проверки валидности введенных данных в поле
const checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
  if (inputElement.validity.valid) {
    // Если данные введены корректно, скрываем сообщение об ошибке
    hideInputError(inputElement, errorElement, inputErrorClass);
  } else {
    // Если данные введены некорректно, показываем сообщение об ошибке
    showInputError(inputElement, errorElement, inputErrorClass);
  }
};

// Функция для проверки, есть ли невалидные поля ввода
const hasInvalidInput = (inputs) => {
  // Используем метод some() для проверки наличия хотя бы одного невалидного поля
  return inputs.some((input) => !input.validity.valid);
};

// Функция для обработки ввода данных в форму
const handleFormInput = (evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs, inputElement) => {
  const errorElement = form.querySelector(`.input-error-${inputElement.name}`);

  // Проверяем валидность введенных данных
  checkInputValidity(inputElement, errorElement, inputErrorClass); 

  // Переключаем состояние кнопки в зависимости от наличия невалидных полей ввода
  toggleButtonState(formSubmitButtonElement, inactiveButtonClass, hasInvalidInput(inputs));
};

// Функция для включения валидации формы
const enableValidation = ({formSelector, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass }) => {
  // Получаем список всех форм на странице и перебираем их
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => { 
    // Получаем список всех полей ввода в текущей форме
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    // Получаем кнопку отправки формы в текущей форме
    const formSubmitButtonElement = form.querySelector(submitButtonSelector);
    // Устанавливаем состояние кнопки в зависимости от наличия невалидных полей ввода
    toggleButtonState(formSubmitButtonElement, inactiveButtonClass, hasInvalidInput(inputs));
    
    // Добавляем обработчик ввода данных для каждого инпута
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => handleFormInput(evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs, inputElement ));
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

    /*
    console.log();
    */