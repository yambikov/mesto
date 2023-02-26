
const popupEditProfile = document.querySelector('.popup_type_profile'); // находим popupEditProfile
const buttonProfileEdit = document.querySelector('.profile__edit-button'); // находим иконку открытия попапа 
const popupCloseButton = document.querySelector('.popup__close-icon'); // находим иконку закрытия попапа
const newName = document.querySelector('.profile__title');  //находим текст "Имя"
const newJob = document.querySelector('.profile__subtitle'); //находим текст "Роль"
const profileSubmitForm = popupEditProfile.querySelector('.popup__content'); // находим форму с инпутами
const nameInput = document.querySelector('[name="name"]'); //находим значение инпута "Имя"
const jobInput = document.querySelector('[name="role"]'); 

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
const cardsContainer = document.querySelector('.elements');
const profileEditButton = document.querySelector('.profile__add-button');
const buttonCardClose = popupAddCard.querySelector('.popup__close-icon');
const buttonCardRemove = document.querySelector('.element__remove');
const popupShowImage = document.querySelector('.popup_type_image');
const buttonImageClose = popupShowImage.querySelector('.popup__close-icon');
const cardSubmitForm = popupAddCard.querySelector('.popup__content');
const inputTitleCard = document.querySelector('[name="title"]');
const inputLinkCard = document.querySelector('[name="link"]')
const popupShowImageImageValue = popupShowImage.querySelector('.popup__image');
const popupShowImageCaptionValue = popupShowImage.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');//находим значение инпута "Роль"

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
  openPopup(popupEditProfile)
  nameInput.value = newName.textContent; // присваиваем значению инпута "Имя" значение текста "Имя"
  jobInput.value = newJob.textContent; // аналогично
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

profileSubmitForm.addEventListener('submit', handleFormSubmit);

/*  CARDS */
buttonProfileEdit.addEventListener('click', openPopupProfile);
popupCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
profileEditButton.addEventListener('click', () => openPopup(popupAddCard));
buttonCardClose.addEventListener('click', () => closePopup(popupAddCard));
buttonImageClose.addEventListener('click', () => closePopup(popupShowImage));
cardSubmitForm.addEventListener('submit', createCard);


function addRenderedCards(data) {
  data.forEach((item) => {
    cardsContainer.prepend(renderCard(item));
  })
}

function renderCard(item) {
  const card = cardTemplate.cloneNode('true');
  const buttonLike = card.querySelector('.element__like');
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').alt = item.name;
  // remove
  card.querySelector('.element__remove').addEventListener('click', () => {
    card.remove()
  });
  //like
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('element__like_active');
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

function createCard(evt) {
  evt.preventDefault();

  const card = renderCard({link: inputLinkCard.value, name: inputTitleCard.value})

  cardsContainer.prepend(card); 
  closePopup(popupAddCard);
  evt.target.reset();

  evt.submitter.classList.add('popup__button_disabled')
  evt.submitter.disabled = true;

}

