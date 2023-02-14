/* PROFILE EDIT */

/* Пишем правило для открытия попапа */
let popupProfile = document.querySelector('.popup_type_profile'); // находим popupProfile
let editButton = document.querySelector('.profile__edit-button'); // находим иконку открытия попапа 
let closeButton = document.querySelector('.popup__close-icon'); // находим иконку закрытия попапа
let newName = document.querySelector('.profile__title');  //находим текст "Имя"
let newJob = document.querySelector('.profile__subtitle'); //находим текст "Роль"
let formElement = document.querySelector('.popup_type_profile .popup__content'); // находим форму с инпутами
let nameInput = document.querySelector('[name="profile-edit-name"]'); //находим значение инпута "Имя"
let jobInput = document.querySelector('[name="profile-edit-role"]'); //находим значение инпута "Роль"


/* Пишем функцию для открытия попапа */
function openPopupProfile() {
  popupProfile.classList.add('popup_opened'); // функция добавляет класс popup_opened к попапу
  nameInput.value = newName.textContent; // присваиваем значению инпута "Имя" значение текста "Имя"
  jobInput.value = newJob.textContent; // аналогично
}

editButton.addEventListener('click', openPopupProfile); // вешаем слушателя на кнопку открытия попапа и прописываем событие (клик) и сценарий (запустить функцию открытия попапа)   


/* Пишем функцию для закрытия попапа через иконку закрытия попапа */
function closePopup() {
  popupProfile.classList.remove('popup_opened');
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



/*  CARD ADD  */
/*  Открытие и закрытие popup  */

const popupCard = document.querySelector('.popup_type_card'); // находим popup_type_card
const addButton = document.querySelector('.profile__add-button') // находим кнопку добавления

/* При нажатии на кнопку addButton к popupCard(<div class="popup popup_type_card">) добавляется класс popup_opened  */
addButton.addEventListener('click', () => popupCard.classList.add('popup_opened'))
/* Пишу функцию открыия попапа CardAdd */

/* Нахожу кнопку закрытия попапа CardAdd */
const closeButtonAdd = popupCard.querySelector('.popup__close-icon');
/* Вешаю слушателя на кнопку закрытия попапа CardAdd, при клике запускается функция без имени, которая удаляет класс popup_opened  */
closeButtonAdd.addEventListener('click', () => popupCard.classList.remove('popup_opened'));


/*  Рендер карточек  */

// массив с названиями карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// находим место для вставки кода
const elements = document.querySelector('.elements');

const cardTemplate = document.querySelector('#template')
  .content.querySelector('.element'); // находим темплейт и через content выбираем в нем <div class="element">

//функция рендера карточки

/* Вариант через forEach рабочий, но он каждый раз добавляет в DOM один элемент, это может быть плохо при большом количестве карточек, лучше просчитать все карточки и один раз добавить их в DOM, для этого подходит метод map

//вариант с forEach */
const renderCards = initialCards.forEach((item) => { // item это элемент массива, его можно назвать как угодно
  const cardElement = cardTemplate.cloneNode('true');  // клонируем содержимое тега template
  cardElement.querySelector('.element__image').src = (item.link);  // наполняем содержимым
  cardElement.querySelector('.element__title').textContent = (item.name); // наполняем содержимым
 
  elements.append(cardElement); // отображаем клонированный и заполенный темплейт на странице
});

/* а можно еще и вот так, это тоже forEach
function renderCards (items) {
  items.forEach(function (item) { // item это элемент массива, его можно назвать как угодно, в данном случае item
    const cardElement = cardTemplate.cloneNode('true');  // клонируем содержимое тега template
    cardElement.querySelector('.element__image').src = (item.link); // наполняем содержимым
    cardElement.querySelector('.element__title').textContent = (item.name);  // наполняем содержимым
    elements.append(cardElement); // отображаем клонированный и заполенный темплейт на странице
}) 
};

renderCards (initialCards) // исполняем функцию передавая в нее в качестве аргумента массив */

//метод map вебинар 00:42:00
const renderCards = initialCards.map((item) => { // item это элемент массива, его можно назвать как угодно. Чтобы отрендерить карточку мы берем исходный массив initialCards и применяем к каждому его элементу item функцию ниже. В целом все действие сводится к тому ,что из каждого элемента массива мы возвращаем карточку. Таким образом 
  const cardElement = cardTemplate.cloneNode('true');  // клонируем содержимое тега template
  cardElement.querySelector('.element__image').src = (item.link);  // наполняем содержимым
  cardElement.querySelector('.element__title').textContent = (item.name); // наполняем содержимым

  return cardElement; // возвращаем заполенный темплейт, но пока не в DOM
});


elements.append(...renderCards); // в этот момент в переменную renderCards записан новый массив [div.element, div.element, div.element, div.element, div.element, div.element], массив мы не можем добавить в html-разметку, поэтому добавим перед переменной renderCards три точки (...) - они делают из массива отдельные элементы <div class=​"element">​…​</div>​ <div class=​"element">​…​</div>​ <div class=​"element">​…​</div>​ <div class=​"element">​…​</div>​ <div class=​"element">​…​</div>​


// итак, карточки из массива отрендерили, переходим к ДОБАВЛЕНИЮ НОВЫХ КАРТОЧЕК
  const cardSubmitButton = document.querySelector('.popup_type_card .popup__button'); // находим кнопку сохранить

  cardSubmitButton.addEventListener('click', (e) => {
    e.preventDefault ();
  
    const cardElement = cardTemplate.cloneNode('true');  // клонируем содержимое тега template
    cardElement.querySelector('.element__image').src = document.querySelector('[name="card-edit-link"]').value;  // наполняем содержимым
    cardElement.querySelector('.element__title').textContent = document.querySelector('[name="card-edit-title"]').value; // наполняем содержимым
    elements.prepend(cardElement);
  
    popupCard.classList.remove('popup_opened');
  
  });

///////////////////////////////////

function openPopupV2 (modal) {
  modal.classList.add('popup_opened');
}

function closePopupV2 (modal) {
  modal.classList.remove('popup_opened');
}

function openCardPopup (button){
  button.addEventListener('click',
  openPopupV2 (CardPopup))
}


removeCardButton.addEventListener('click', function () {
  const listItem = removeCardButton.closest('.element');
  listItem.remove();
});

function cardRemove () {
  const listItem = removeCardButton.closest('.element');
  listItem.remove();
} 

function cardRemove () {
  const listItem = removeCardButton.closest('.element');
  listItem.remove();
} 



// выберем кнопку удаления
const removeCardButton = document.querySelector('.element__remove');



function addCreatedCard(evt) {
  evt.preventDefault();
  elements.prepend(createCard(item));
} 


function handleFormSubmit(evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleFormSubmit);