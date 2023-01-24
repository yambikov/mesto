
/* Пишем правило для открытия попапа */

// находим popup
let popup = document.querySelector('.popup');
// находим кнопку  
let editButton = document.querySelector('.profile__edit-button'); 
// создаем функцию для клика по кнопке
function openPopup() {                           
  popup.classList.add('popup_opened'); // функция добавляет класс popup_opened к попапу
  
}
// вешаем слушателя на кнопку и прописываем событие (клик) и сценарий (запустить функцию)
editButton.addEventListener('click', openPopup);    



/* Пишем правило для открытия попапа */

let closeButton = document.querySelector('.popup__close-icon');

function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);


/* Пишем правио для сохранения содержимого */

// Находим форму в DOM
let formElement = document.querySelector('.popup__content');
// Находим поля формы в DOM
let nameInput = document.querySelector('[name="profile-edit-name"]'); //[name="your-selector-name-here"]
let jobInput = document.querySelector('[name="profile-edit-role"]');
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
 
  // Получите значение полей jobInput и nameInput из свойства value
  console.log(nameInput.value);
  console.log(jobInput.value);
  // Выберите элементы, куда должны быть вставлены значения полей
  let newName = document.querySelector('.profile__title');
  let newJob = document.querySelector('.profile__subtitle');
  // Вставьте новые значения с помощью textContent
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
