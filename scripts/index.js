import Card from "./Card.js";
import initialCards from "./constants.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";

// Переменные
const profilePopup = document.querySelector('.popup_type_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close-icon');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profileForm = profilePopup.querySelector('.popup__content');
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="role"]');
const cardPopup = document.querySelector('.popup_type_card');
const cardsContainer = document.querySelector('.elements');
const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close-icon');
const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopup.querySelector('.popup__close-icon');
const cardForm = cardPopup.querySelector('.popup__content');
const titleInput = document.querySelector('[name="title"]');
const linkInput = document.querySelector('[name="link"]');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
const cardTemplate = document.getElementById('template');

// Слушатели
profileEditButton.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
cardAddButton.addEventListener('click', openCardPopup);
cardCloseButton.addEventListener('click', () => closePopup(cardPopup));
imageCloseButton.addEventListener('click', () => closePopup(imagePopup));

// class ушло в Popup
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

profileForm.addEventListener('submit', handleSubmitProfileForm);
cardForm.addEventListener('submit', handleSubmitCardForm);

// Функции

// ушло в class Popup
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal);
  }
}

// коллбэк сабмита формы PopupWithForm
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

// ушло в class PopupWithImage
function openImage(data) {
  imagePopupImage.src = data.link;
  imagePopupImage.alt = data.name;
  imagePopupCaption.textContent = data.name;
  openPopup(imagePopup);
}

// коллбэк сабмита формы PopupWithForm
function handleSubmitCardForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  };

  renderCard(newCard);
  closePopup(cardPopup);
  //evt.target.reset();
}


function createCard(data) {
  const card = new Card(data, openImage, cardTemplate);
  const cardElement = card.generateCard();
  return cardElement;
}

// //ушло в class Section
// initialCards.forEach((data) => {
//   renderCard(data);
// });


function renderCard(card) {
  cardsContainer.prepend(createCard(card))
}

const formData = {
  formSelector: '.popup__content',
  inputSelector: '.popup__item',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
};

// ушло в class Popup
function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// ушло в class Popup
function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function openProfilePopup() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileFormValidator.resetValidation();
}

function openCardPopup() {
  openPopup(cardPopup);
  cardFormValidator.resetValidation();
}

const profileFormValidator = new FormValidator(formData, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(formData, cardForm);
cardFormValidator.enableValidation();


// создаем и добавляем карточки из initialCards
const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, openImage, cardTemplate);
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    }
  },
  '.elements',
);

section.renderItems();















