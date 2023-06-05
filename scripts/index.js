import Card from "./Card.js";
import initialCards from "./constants.js";
import FormValidator from "./FormValidator.js";

// Переменные
const popupEditProfile = document.querySelector('.popup_type_profile');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonProfileClose = popupEditProfile.querySelector('.popup__close-icon');
const newName = document.querySelector('.profile__title');
const newJob = document.querySelector('.profile__subtitle');
const profileSubmitForm = popupEditProfile.querySelector('.popup__content');
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="role"]');
const popupAddCard = document.querySelector('.popup_type_card');
const cardsContainer = document.querySelector('.elements');
const profileEditButton = document.querySelector('.profile__add-button');
const buttonCardClose = popupAddCard.querySelector('.popup__close-icon');
const popupShowImage = document.querySelector('.popup_type_image');
const buttonImageClose = popupShowImage.querySelector('.popup__close-icon');
const cardSubmitForm = popupAddCard.querySelector('.popup__content');
const inputTitleCard = document.querySelector('[name="title"]');
const inputLinkCard = document.querySelector('[name="link"]');
const popupShowImageImageValue = popupShowImage.querySelector('.popup__image');
const popupShowImageCaptionValue = popupShowImage.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
const cardTemplate = document.getElementById('template');

// Слушатели
buttonProfileEdit.addEventListener('click', openPopupProfile);
buttonProfileClose.addEventListener('click', () => closePopup(popupEditProfile));
profileEditButton.addEventListener('click', () => openPopup(popupAddCard));
buttonCardClose.addEventListener('click', () => closePopup(popupAddCard));
buttonImageClose.addEventListener('click', () => closePopup(popupShowImage));

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

profileSubmitForm.addEventListener('submit', handleFormSubmit);
cardSubmitForm.addEventListener('submit', createCard);

// Функции
function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal);
  }
}

function openPopupProfile() {
  openPopup(popupEditProfile);
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function openImage(data) {
  popupShowImageImageValue.src = data.link;
  popupShowImageImageValue.alt = data.name;
  popupShowImageCaptionValue.textContent = data.name;
  openPopup(popupShowImage);
}

function createCard(evt) {
  evt.preventDefault();
  const addNewCard = {
    name: inputTitleCard.value,
    link: inputLinkCard.value,
  };

  cardsContainer.prepend(createNewCard(addNewCard));
  closePopup(popupAddCard);
  evt.target.reset();

  evt.submitter.classList.add('popup__button_disabled');
  evt.submitter.disabled = true;
}

function createNewCard(data) {
  const card = new Card(data, openImage, cardTemplate);
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавление карточек из массива initialCards
initialCards.forEach((data) => {
  const cardElement = createNewCard(data);
  cardsContainer.prepend(cardElement);
});

const formData = {
  formSelector: '.popup__content',
  inputSelector: '.popup__item',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
}

const formList = Array.from(document.querySelectorAll(formData.formSelector));
formList.forEach((formElement) => {
  const validator = new FormValidator(formData, formElement);
  validator.enableValidation();
})
