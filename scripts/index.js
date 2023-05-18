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
    const modal = document.querySelector('.popup_opened');
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
  console.log(123)
}

profileSubmitForm.addEventListener('submit', handleFormSubmit);

/*  CARDS */
profileEditButton.addEventListener('click', openPopupProfile); // при клике на кнопку редактирования профиля открываем попап
profileCloseButton.addEventListener('click', () => closePopup(popupProfile)); // при клике на кнопку закрытия попапа, закрываем попап профиля
cardAddButton.addEventListener('click', () => openPopup(popupCard)); // при клике на кнопку добавления карточки, открываем попап карточки
cardCloseButton.addEventListener('click', () => closePopup(popupCard)); // при клике на кнопку закрытия попапа карточки, закрываем попап карточки
imageCloseButton.addEventListener('click', () => closePopup(popupImage)); // при клике на кнопку закрытия картинки, картинка закрывается
cardSubmitForm.addEventListener('submit', createCard); // при отправке формы карточки, создаем карточку

function addCards(data) {
  data.forEach((item) => {
    const card = new Card(item, selectors, cardTemplate, openPopup, popupImageImg, popupImageCaption, popupImage);

    cardsContainer.prepend(card.renderCard());
  });
}

function createCard(evt) {
  evt.preventDefault();

  const card = new Card({ link: cardLinkInput.value, name: cardTitleInput.value }, selectors, cardTemplate, openPopup, popupImageImg, popupImageCaption, popupImage);

  cardsContainer.prepend(card.renderCard());

  console.log (Card)

  closePopup(popupCard);
  evt.target.reset();

  evt.target.querySelector('.popup__button').classList.add('popup__button_disabled');
  evt.target.querySelector('.popup__button').disabled = true;

}

addCards(initialCards); // добавление карточек из массива
