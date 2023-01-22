
/* Пишем правило для открытия попапа */

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



/* Пишем правило для открытия попапа */

let close_button = document.querySelector('.popup__close-icon');

function closePopup() {
  popup.classList.remove('popup_opened');
}

close_button.addEventListener('click', closePopup);


/* Пишем правио для сохранения содержимого */

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
  closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
