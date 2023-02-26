/* PROFILE EDIT */

const popupEditProfile = document.querySelector('.popup_type_profile'); // находим popupEditProfile
const editButton = document.querySelector('.profile__edit-button'); // находим иконку открытия попапа 
const closeButtonProfile = document.querySelector('.popup__close-icon'); // находим иконку закрытия попапа
const newName = document.querySelector('.profile__title');  //находим текст "Имя"
const newJob = document.querySelector('.profile__subtitle'); //находим текст "Роль"
const formElement = document.querySelector('.popup_type_profile .popup__content'); // находим форму с инпутами
const nameInput = document.querySelector('[name="name"]'); //находим значение инпута "Имя"
const jobInput = document.querySelector('[name="role"]'); //находим значение инпута "Роль"

function openPopup(modal) {
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal);
  }
}

document.addEventListener('keydown', closePopupEsc);

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});


function openPopupProfile() {
  openPopup(popupEditProfile)
  nameInput.value = newName.textContent; // присваиваем значению инпута "Имя" значение текста "Имя"
  jobInput.value = newJob.textContent; // аналогично
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
const cardSubmitForm = popupAddCard.querySelector('.popup__content');
const inputTitleCard = document.querySelector('[name="title"]');
const inputLinkCard = document.querySelector('[name="link"]')
const popupShowImageImageValue = popupShowImage.querySelector('.popup__image');
const popupShowImageCaptionValue = popupShowImage.querySelector('.popup__caption');




editButton.addEventListener('click', openPopupProfile);
closeButtonProfile.addEventListener('click', () => closePopup(popupEditProfile));
addButtonCard.addEventListener('click', () => openPopup(popupAddCard));
closeButtonCard.addEventListener('click', () => closePopup(popupAddCard));
closeButtonImage.addEventListener('click', () => closePopup(popupShowImage));



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
    popupShowImageImageValue.src = item.link;
    popupShowImageImageValue.alt = item.name;
    popupShowImageCaptionValue.textContent = item.name;
    openPopup(popupShowImage);
  })
  return card;
}

addRenderedCards(initialCards);


cardSubmitForm.addEventListener('submit', createCard);



function createCard(evt) {
  evt.preventDefault();

  const card = renderCard({link: inputLinkCard.value, name: inputTitleCard.value})

  //console.log('link');

  elements.prepend(card); 
  closePopup(popupAddCard);
  evt.target.reset();

}

