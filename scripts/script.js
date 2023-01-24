
/* Пишем правило для открытия попапа */

<<<<<<< Updated upstream:scripts/script.js
// находим popup
let popup = document.querySelector('.popup');
// находим кнопку  
let edit_button = document.querySelector('.profile__edit-button'); 
// создаем функцию для клика по кнопке
function openPopup() {                           
  popup.classList.add('popup_opened'); // функция добавляет класс popup_opened к попапу
}
// вешаем слушателя на кнопку и прописываем событие (клик) и сценарий (запустить функцию)
edit_button.addEventListener('click', openPopup);    
=======
let popup = document.querySelector('.popup'); // находим popup
let editButton = document.querySelector('.profile__edit-button'); // находим иконку открытия попапа 
let closeButton = document.querySelector('.popup__close-icon'); // находим иконку закрытия попапа
let newName = document.querySelector('.profile__title');  //находим текст "Имя"
let newJob = document.querySelector('.profile__subtitle'); //находим текст "Роль"
let formElement = document.querySelector('.popup__content'); // находим форму с инпутами
let nameInput = document.querySelector('[name="profile-edit-name"]'); //находим значение инпута "Имя"
let jobInput = document.querySelector('[name="profile-edit-role"]'); //находим значение инпута "Роль"



/* Пишем функцию для открытия попапа */
function openPopup() {
  popup.classList.add('popup_opened'); // функция добавляет класс popup_opened к попапу
  nameInput.value = newName.textContent; // присваиваем значению инпута "Имя" значение текста "Имя"
  jobInput.value = newJob.textContent; // аналогично
}
>>>>>>> Stashed changes:scripts/index.js

editButton.addEventListener('click', openPopup); // вешаем слушателя на кнопку открытия попапа и прописываем событие (клик) и сценарий (запустить функцию открытия попапа)   


<<<<<<< Updated upstream:scripts/script.js
/* Пишем правило для открытия попапа */

let close_button = document.querySelector('.popup__close-icon');
=======
>>>>>>> Stashed changes:scripts/index.js

/* Пишем функцию для закрытия попапа через иконку закрытия попапа */
function closePopup() {
  popup.classList.remove('popup_opened');
}

close_button.addEventListener('click', closePopup);


/* Пишем правио для сохранения содержимого */

<<<<<<< Updated upstream:scripts/script.js
// Находим форму в DOM
let formElement = document.querySelector('.popup__content');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__item_el_name');
let jobInput = document.querySelector('.popup__item_el_role');
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
 
  // Получите значение полей jobInput и nameInput из свойства value
  console.log(nameInput.value);
  console.log(jobInput.value);
  // Выберите элементы, куда должны быть вставлены значения полей
  let new_name = document.querySelector('.profile__title');
  let new_job = document.querySelector('.profile__subtitle');
  // Вставьте новые значения с помощью textContent
  new_name.textContent = nameInput.value;
  new_job.textContent = jobInput.value;
=======
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
>>>>>>> Stashed changes:scripts/index.js
  closePopup()
}

formElement.addEventListener('submit', handleFormSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
