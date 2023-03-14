import Card from "./Card.js";


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

const selectors = {
  containerForCards: '.elements',
  cardTemplate: '.element',
  popups: '.popup',
  template: '#template',

  cardLikeBtn: '.element__like',
  cardImage: '.element__image',
  cardTitle: '.element__title',
  cardRemoveBtn: '.element__remove',
  cardLikeActive: 'element__like_active',
  cardTitleInput: '[name="title"]',
  cardLinkInput: '[name="link"]',

  popupTypeProfile: '.popup_type_profile',
  popupTypeCard: '.popup_type_card',
  popupTypeImage: '.popup_type_image',
  popupCloseBtn: '.popup__close-icon',
  popupForm: '.popup__content',
  popupImage: '.popup__image',
  popupCaption: '.popup__caption',

  profileEditBtn: '.profile__edit-button',
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  profileAddButton: '.profile__add-button',
  profileTitleInput: '[name="name"]',
  profileSubtitleInput: '[name="role"]',
};

const cardTemplate = document.querySelector('#template').content.querySelector(selectors.cardTemplate); // темплейт

const popups = document.querySelectorAll(selectors.popups); // находим все попапы

const popupProfile = document.querySelector(selectors.popupTypeProfile); // попап для профиля
const popupCard = document.querySelector(selectors.popupTypeCard); // попап для карточки
const popupImage = document.querySelector(selectors.popupTypeImage); // попап для картинки

const popupImageImg = popupImage.querySelector(selectors.popupImage); // попап для картинки тег img
const popupImageCaption = popupImage.querySelector(selectors.popupCaption); // попап для картинки тег p

const profileCloseButton = popupProfile.querySelector(selectors.popupCloseBtn); // находим иконку закрытия попапа
const imageCloseButton = popupImage.querySelector(selectors.popupCloseBtn); // кнопка закрытия картинки
//const buttonCardRemove = document.querySelector('.element__remove');
const profileEditButton = document.querySelector(selectors.profileEditBtn); // находим кнопку открытия попапа 
const profileTitle = document.querySelector(selectors.profileTitle);  //находим текст "Имя"
const profileSubtitle = document.querySelector(selectors.profileSubtitle); //находим текст "Роль"
const profileSubmitForm = popupProfile.querySelector(selectors.popupForm); // находим форму с инпутами
const profileTitleInput = document.querySelector(selectors.profileTitleInput); //находим значение инпута формы профиля "Имя"
const profileSubtitleInput = document.querySelector(selectors.profileSubtitleInput); //находим значение инпута формы профиля "Профессия"
const cardAddButton = document.querySelector(selectors.profileAddButton); // кнопка открытия попапа для добавления карточки

const cardsContainer = document.querySelector(selectors.containerForCards); // контейнер для карточек

const cardSubmitForm = popupCard.querySelector(selectors.popupForm); // форма в попапе для карточек   
const cardTitleInput = document.querySelector(selectors.cardTitleInput); // значение инпута Title для карточки  
const cardLinkInput = document.querySelector(selectors.cardLinkInput) // значение инпута Link для карточки 
const cardCloseButton = popupCard.querySelector(selectors.popupCloseBtn); // кнопка закрытия попапа карточки


function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc); // добавляет слушателя на нажатие кнопки на весь документ
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc); // удаляет слушателя на нажатие кнопки на весь документ
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    //const modal = document.querySelector('.popup_opened'); // без этого тоже работает
    closePopup(modal);
  }
}

function openPopupProfile() {
  openPopup(popupProfile)
  profileTitleInput.value = profileTitle.textContent; // присваиваем значению инпута "Имя" значение текста "Имя"
  profileSubtitleInput.value = profileSubtitle.textContent; // аналогично
}

//закрытие попапа при клике на свободную область экрана
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closePopup(popupProfile);
}

profileSubmitForm.addEventListener('submit', handleFormSubmit);

/*  CARDS */
profileEditButton.addEventListener('click', openPopupProfile); // при клике на кнопку редактирования профиля открываем попап
profileCloseButton.addEventListener('click', () => closePopup(popupProfile)); // при клике на кнопку закрытия попапа, закрываем попап профиля
cardAddButton.addEventListener('click', () => openPopup(popupCard)); // при клике на кнопку добавления карточки, открываем попап карточки
cardCloseButton.addEventListener('click', () => closePopup(popupCard)); // при клике на кнопку закрытия попапа карточки, закрываем попап карточки
imageCloseButton.addEventListener('click', () => closePopup(popupImage)); // при клике на кнопку закрытия картинки, картинка закрывается
cardSubmitForm.addEventListener('submit', createCard); // при отправке формы карточки, создаем карточку

/*
function renderCard(item) {
  const card = cardTemplate.cloneNode('true');
  const buttonLike = card.querySelector(selectors.cardLikeBtn);
  card.querySelector(selectors.cardImage).src = item.link;
  card.querySelector(selectors.cardTitle).textContent = item.name;
  card.querySelector(selectors.cardImage).alt = item.name;

  // remove
  card.querySelector(selectors.cardRemoveBtn).addEventListener('click', () => {
    card.remove()
  });

  //like
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle(selectors.cardLikeActive);
  });

  //image
  card.querySelector(selectors.cardImage).addEventListener('click', () => {
    popupImageImg.src = item.link;
    popupImageImg.alt = item.name;
    popupImageCaption.textContent = item.name;
    openPopup(popupImage);
  });
  console.log(card)
  return card;
}

*/

const newCard = new Card(selectors, cardTemplate, openPopup, popupImageImg, popupImageCaption, popupImage);


function addCards(data) {
  data.forEach((item) => {
    cardsContainer.prepend(newCard.renderCard(item));
  });
}

function createCard(evt) {
  evt.preventDefault();

  const card = newCard.renderCard({ link: cardLinkInput.value, name: cardTitleInput.value })

  cardsContainer.prepend(card);
  closePopup(popupCard);
  evt.target.reset();

  evt.submitter.classList.add('popup__button_disabled') // submitter  - это источник события, в данном случае кнопка Submit
  evt.submitter.disabled = true;

}

addCards(initialCards); // добавление карточек из массива




//newCard.getInfo();
//newCard.renderCard();















// openPopup функция открытия попапа
// closePopup функция закрытия попапа
// closePopupEsc функция закрытия попапа по кнопке esc
// openPopupProfile функция открывает попап редактирования профиля
//handleFormSubmit функция обрабатывает форму редактирования профиля, не дает данным попасть на сервер, присваивает значения из формы карточке, закрывает попа

/* Функция renderCard(item) принимает объект item в качестве аргумента и создает новый элемент карточки, используя шаблон, заданный в переменной cardTemplate.
В этом шаблоне задаются разметка карточки и ее элементов, таких как картинка, заголовок и кнопки. Функция заполняет значениями соответствующих свойств объекта item в качестве содержимого для элементов карточки.
Затем функция возвращает созданный элемент карточки, но не добавляет его в разметку. */

//функция addCards создает и добавляет на страницу карточки, основываясь на переданных ей данных из массива

/*  Функция createCard(evt) является обработчиком событий клика на кнопке "Добавить карточку". Когда пользователь кликает на эту кнопку, вызывается функция createCard(evt), которая в свою очередь создает новую карточку с пустым заголовком и ссылкой на картинку, и добавляет ее в список карточек на странице. Кроме того, функция createCard(evt) добавляет обработчик событий на кнопку удаления новой карточки, чтобы удалить ее при необходимости. */
