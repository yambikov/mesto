/* PROFILE EDIT */

let popupEditProfile = document.querySelector('.popup_type_profile'); // находим popupEditProfile
let editButton = document.querySelector('.profile__edit-button'); // находим иконку открытия попапа 
let closeButtonProfile = document.querySelector('.popup__close-icon'); // находим иконку закрытия попапа
let newName = document.querySelector('.profile__title');  //находим текст "Имя"
let newJob = document.querySelector('.profile__subtitle'); //находим текст "Роль"
let formElement = document.querySelector('.popup_type_profile .popup__content'); // находим форму с инпутами
let nameInput = document.querySelector('[name="profile-edit-name"]'); //находим значение инпута "Имя"
let jobInput = document.querySelector('[name="profile-edit-role"]'); //находим значение инпута "Роль"

function openPopup(modal) {
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

function openPopupProfile() {
  openPopup(popupEditProfile)
  nameInput.value = newName.textContent; // присваиваем значению инпута "Имя" значение текста "Имя"
  jobInput.value = newJob.textContent; // аналогично
}

function openPopupImage() {

}

function handleFormSubmit(evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleFormSubmit);




/*  CARDS */

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

const cardTemplate = document.querySelector('#template').content.querySelector('.element');
const popupAddCard = document.querySelector('.popup_type_card');
const elements = document.querySelector('.elements');
const addButtonCard = document.querySelector('.profile__add-button');
const closeButtonCard = popupAddCard.querySelector('.popup__close-icon');
const removeCardButton = document.querySelector('.element__remove');
const popupShowImage = document.querySelector('.popup_type_image');
const closeButtonImage = popupShowImage.querySelector('.popup__close-icon');
const cardSubmitButton = popupAddCard.querySelector('.popup__button')


editButton.addEventListener('click', openPopupProfile);
closeButtonProfile.addEventListener('click', () => closePopup(popupEditProfile));
addButtonCard.addEventListener('click', () => openPopup(popupAddCard));
closeButtonCard.addEventListener('click', () => closePopup(popupAddCard));
closeButtonImage.addEventListener('click', () => closePopup(popupShowImage));
cardSubmitButton.addEventListener('click', createCard)


function addRenderedCards(data) {
  data.forEach((item) => {
    elements.prepend(renderCard(item));
  })
}


function renderCard(item) {
  const card = cardTemplate.cloneNode('true');
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').alt = item.name;
  // remove
  card.querySelector('.element__remove').addEventListener('click', () => {
    card.remove()
  });
  //like
  card.querySelector('.element__like').addEventListener('click', () => {
    card.querySelector('.element__like').classList.toggle('element__like_active');
  })
  //image
  card.querySelector('.element__image').addEventListener('click', () => {
    popupShowImage.querySelector('.popup__image').src = item.link;
    popupShowImage.querySelector('.popup__image').alt = item.name;
    popupShowImage.querySelector('.popup__caption').textContent = item.name;
    openPopup(popupShowImage);
  })
  return card;
}

addRenderedCards(initialCards);


function createCard(evt) {
  evt.preventDefault();
  const card = cardTemplate.cloneNode('true');
  card.querySelector('.element__image').src = document.querySelector('[name="card-edit-link"]').value;
  card.querySelector('.element__title').textContent = document.querySelector('[name="card-edit-title"]').value;
  card.querySelector('.element__image').alt = document.querySelector('[name="card-edit-title"]').value;

  card.querySelector('.element__remove').addEventListener('click', () => {
    card.remove()
  });
  //like
  card.querySelector('.element__like').addEventListener('click', () => {
    card.querySelector('.element__like').classList.toggle('element__like_active');
  })
  //image
  card.querySelector('.element__image').addEventListener('click', () => {
    popupShowImage.querySelector('.popup__image').src = document.querySelector('[name="card-edit-link"]').value;
    popupShowImage.querySelector('.popup__image').alt = document.querySelector('[name="card-edit-title"]').value;
    popupShowImage.querySelector('.popup__caption').textContent = document.querySelector('[name="card-edit-title"]').value;
    openPopup(popupShowImage);
  })




  elements.prepend(card)
  closePopup(popupAddCard);
}


