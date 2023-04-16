// Функция showInputError отображает сообщение об ошибке для поля ввода, которое не прошло валидацию, путем добавления класса inputErrorClass для поля ввода и установки текста validationMessage в элементе errorElement.

const showInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};


// Функция hideInputError скрывает сообщение об ошибке для поля ввода, путем удаления класса inputErrorClass для поля ввода и очистки текста в элементе errorElement.

const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};


// Функция toggleButtonState изменяет состояние кнопки отправки формы, путем переключения класса inactiveButtonClass в зависимости от значения buttonState и установки атрибута disabled для кнопки в соответствии с buttonState.

const toggleButtonState = (formSubmitButtonElement, inactiveButtonClass, buttonState) => {
  //console.log(buttonState);
  formSubmitButtonElement.classList.toggle(inactiveButtonClass, buttonState);
  formSubmitButtonElement.disabled = buttonState;
};


// Функция checkInputValidity проверяет валидность введенных данных для поля ввода, и если данные прошли валидацию, вызывает функцию hideInputError, в противном случае вызывает функцию showInputError.

const checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
  if (inputElement.validity.valid) {
    //console.log(inputElement.validity.valid);
    hideInputError(inputElement, errorElement, inputErrorClass);
  } else {
    showInputError(inputElement, errorElement, inputErrorClass);
  }
};


//Функция hasInvalidInput возвращает true, если хотя бы одно поле ввода не прошло валидацию, используя метод some для проверки каждого элемента массива полей ввода.

const hasInvalidInput = (inputs) => {
  //console.log(inputs)
  return inputs.some((input) => !input.validity.valid);
  
};



// Функция handleFormInput при событии 'input' создает константу errorElement в которую кладет span c нужным классом и вызывает функции checkInputValidity и toggleButtonState
const handleFormInput = (evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs, inputElement) => {
  const errorElement = form.querySelector(`.input-error-${inputElement.name}`);
/* console.log(evt) 
InputEvent {isTrusted: true, data: '1', isComposing: false, inputType: 'insertText', dataTransfer: null, …} и если раскрыть, то можно увидеть параметры всплытия и target элемент и прочее  */
/* console.log(errorElement) 
может принимать одно из четырех значений
<span class="input-error-name error"></span> 
либо <span class="input-error-role error"></span> 
либо <span class="input-error-title error"></span> 
либо <span class="input-error-link error"></span> */
/* console.log(inputElement.name)
Отображается в консоле, когда я начинаю печатать в инпуте. inputElement.name — берется из атрибута "name" инпута. В нашем случае у нас 4 инпута и они могут принимать значения name, title, role, link */

  
  checkInputValidity(inputElement, errorElement, inputErrorClass); // функция для спана
  toggleButtonState(formSubmitButtonElement, inactiveButtonClass, hasInvalidInput(inputs)); // функция для кнопки
};


//Функция enableValidation добавляет обработчики событий для формы и полей ввода, вызывает функцию toggleButtonState для кнопки отправки формы и передает параметры для других функций, таких как inputSelector, inputErrorClass, submitButtonSelector и inactiveButtonClass. Она также итерирует каждую форму в formList, находит поля ввода и кнопки отправки формы и назначает обработчики событий для полей ввода.

const enableValidation = ({formSelector, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector)); // проходимся по документу и находим две формы из которых создается массив formList
  /* console.log (formList)
 [form.popup__content, form.popup__content] */
  /* console.log (formList[0])
  <form class="popup__content" name="profile-edit" novalidate="">
        <h2 class="popup__title">Редактировать профиль</h2>
        <input class="popup__item" name="name" type="text" value="" placeholder="" minlength="2" maxlength="40" required="">
        <span class="input-error-name error"></span> 
        <input class="popup__item" name="role" type="text" value="" placeholder="" minlength="2" maxlength="200" required="">
        <span class="input-error-role error"></span>
        <input class="popup__button popup__button_disabled" type="submit" value="Сохранить" disabled="">
      </form> */
  /* console.log (formList[1])
      <form class="popup__content" name="card-edit" novalidate="">
        <h2 class="popup__title">Новое место</h2>
        <input class="popup__item" name="title" type="text" value="" placeholder="Название" minlength="2" maxlength="30" autocomplete="off" required="">
        <span class="input-error-title error"></span>
        <input class="popup__item" name="link" type="url" value="" placeholder="Ссылка на картинку" required="" autocomplete="off">
        <span class="input-error-link error"></span>
        <input class="popup__button popup__button_disabled" type="submit" value="Сохранить" disabled="">
      </form> */
  formList.forEach((form) => { // 
    /*console.log(form)  
    <form class="popup__content" name="profile-edit" novalidate="">
        <h2 class="popup__title">Редактировать профиль</h2>
        <input class="popup__item" name="name" type="text" value="" placeholder="" minlength="2" maxlength="40" required="">
        <span class="input-error-name error"></span> 
        <input class="popup__item" name="role" type="text" value="" placeholder="" minlength="2" maxlength="200" required="">
        <span class="input-error-role error"></span>
        <input class="popup__button popup__button_disabled" type="submit" value="Сохранить" disabled="">
      </form>
      <form class="popup__content" name="card-edit" novalidate="">
        <h2 class="popup__title">Новое место</h2>
        <input class="popup__item" name="title" type="text" value="" placeholder="Название" minlength="2" maxlength="30" autocomplete="off" required="">
        <span class="input-error-title error"></span>
        <input class="popup__item" name="link" type="url" value="" placeholder="Ссылка на картинку" required="" autocomplete="off">
        <span class="input-error-link error"></span>
        <input class="popup__button popup__button_disabled" type="submit" value="Сохранить" disabled="">
      </form> */
   
    const inputs = Array.from(form.querySelectorAll(inputSelector)); // в массиве форм formList находим инпуты(popup__item) и складываем их в новый массив inputs (из формы делаем массив инпутов, так как формы две, то будет два массива по два инпута в каждом)
    /* console.log (inputs)
    (2) [input.popup__item, input.popup__item]
    (2) [input.popup__item, input.popup__item] */
    /* console.log (inputs[0])
    <input class="popup__item" name="name" type="text" value="" placeholder="" minlength="2" maxlength="40" required="">
    <input class="popup__item" name="title" type="text" value="" placeholder="Название" minlength="2" maxlength="30" autocomplete="off" required=""> */
    /* console.log (inputs[1])
    <input class="popup__item" name="role" type="text" value="" placeholder="" minlength="2" maxlength="200" required="">
    <input class="popup__item" name="link" type="url" value="" placeholder="Ссылка на картинку" required="" autocomplete="off"> */
   
    const formSubmitButtonElement = form.querySelector(submitButtonSelector); // пока непонятно, зачем мы здесь обозначаем кнопки
    /* console.log (formSubmitButtonElement) 
    <input class="popup__button popup__button_disabled" type="submit" value="Сохранить" disabled="">
    <input class="popup__button popup__button_disabled" type="submit" value="Сохранить" disabled="">
    */

    toggleButtonState(formSubmitButtonElement, inactiveButtonClass, hasInvalidInput(inputs));

    inputs.forEach((inputElement) => {
     /* console.log(inputElement); 
      <input class="popup__item" name="name" type="text" value="" placeholder="" minlength="2" maxlength="40" required="">
      <input class="popup__item" name="role" type="text" value="" placeholder="" minlength="2" maxlength="200" required="">
      <input class="popup__item" name="title" type="text" value="" placeholder="Название" minlength="2" maxlength="30" autocomplete="off" required="">
      <input class="popup__item" name="link" type="url" value="" placeholder="Ссылка на картинку" required="" autocomplete="off">
     */
  
      inputElement.addEventListener('input', (evt) => handleFormInput(evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs, inputElement )); // повесили слушателей на все инпуты и передали колбэком функцию handleFormInput
      
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

 */