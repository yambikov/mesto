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

const formData = {
  formSelector: '.popup__content',
  inputSelector: '.popup__item',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  nameInput: '[name="name"]',
  jobInput: '[name="role"]',
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  avatar: '.profile__avatar'
};

const profilePopup = document.querySelector('.popup_type_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = profilePopup.querySelector('.popup__content');
const cardPopup = document.querySelector('.popup_type_card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardForm = cardPopup.querySelector('.popup__content');
const cardTemplate = document.getElementById('template');

export { 
  initialCards, 
  formData, 
  profilePopup,
  profileEditButton,
  profileForm,
  cardPopup,
  cardAddButton,
  cardForm,
  cardTemplate,
};