
/* Пишем правило для открытия попапа */
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

editButton.addEventListener('click', openPopup); // вешаем слушателя на кнопку открытия попапа и прописываем событие (клик) и сценарий (запустить функцию открытия попапа)   



/* Пишем функцию для закрытия попапа через иконку закрытия попапа */
function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);


/* Пишем правио для сохранения содержимого */

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup()
}

formElement.addEventListener('submit', handleFormSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
