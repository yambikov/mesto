import Card from "./Card.js";


// Const

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
const cardTemplate = document.querySelector('#template').content.querySelector(selectors.cardTemplate);

const popupProfile = document.querySelector(selectors.popupTypeProfile); // находим popupEditProfile
const popupAddCard = document.querySelector(selectors.popupTypeCard);
const popupShowImage = document.querySelector(selectors.popupTypeImage);
const popupShowImageImageValue = popupShowImage.querySelector(selectors.popupImage);
const popupShowImageCaptionValue = popupShowImage.querySelector(selectors.popupCaption);
const popups = document.querySelectorAll(selectors.popups);//находим значение инпута "Роль"
const popupCloseButton = document.querySelector(selectors.popupCloseBtn); // находим иконку закрытия попапа
const buttonCardClose = popupAddCard.querySelector(selectors.popupCloseBtn);
//const buttonCardRemove = document.querySelector('.element__remove');

const profileEditButton = document.querySelector(selectors.profileEditBtn); // находим иконку открытия попапа 
const profileTitle = document.querySelector(selectors.profileTitle);  //находим текст "Имя"
const profileSubtitle = document.querySelector(selectors.profileSubtitle); //находим текст "Роль"
const profileSubmitForm = popupProfile.querySelector(selectors.popupForm); // находим форму с инпутами
const profileTitleInput = document.querySelector(selectors.profileTitleInput); //находим значение инпута "Имя"
const profileSubtitleInput = document.querySelector(selectors.profileSubtitleInput);
const profileAddButton = document.querySelector(selectors.profileAddButton);

const cardsContainer = document.querySelector(selectors.containerForCards);
const buttonImageClose = popupShowImage.querySelector(selectors.popupCloseBtn);
const cardSubmitForm = popupAddCard.querySelector(selectors.popupForm);
const cardTitleInput = document.querySelector(selectors.cardTitleInput);
const cardLinkInput = document.querySelector(selectors.cardLinkInput)


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
  openPopup(popupProfile)
  profileTitleInput.value = profileTitle.textContent; // присваиваем значению инпута "Имя" значение текста "Имя"
  profileSubtitleInput.value = profileSubtitle.textContent; // аналогично
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
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closePopup(popupProfile);
}

profileSubmitForm.addEventListener('submit', handleFormSubmit);

/*  CARDS */
profileEditButton.addEventListener('click', openPopupProfile);
popupCloseButton.addEventListener('click', () => closePopup(popupProfile));
profileAddButton.addEventListener('click', () => openPopup(popupAddCard));
buttonCardClose.addEventListener('click', () => closePopup(popupAddCard));
buttonImageClose.addEventListener('click', () => closePopup(popupShowImage));
cardSubmitForm.addEventListener('submit', createCard);


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
    popupShowImageImageValue.src = item.link;
    popupShowImageImageValue.alt = item.name;
    popupShowImageCaptionValue.textContent = item.name;
    openPopup(popupShowImage);
  });

  console.log(card);
  return card;
}

function addCards(data) {
  data.forEach((item) => {
    cardsContainer.prepend(renderCard(item));
  })
}

addCards(initialCards);

function createCard(evt) {
  evt.preventDefault();

  const card = renderCard({ link: cardLinkInput.value, name: cardTitleInput.value })

  cardsContainer.prepend(card);
  closePopup(popupAddCard);
  evt.target.reset();

  evt.submitter.classList.add('popup__button_disabled')
  evt.submitter.disabled = true;

}


//const card = new Card;
//card.getInfo();

