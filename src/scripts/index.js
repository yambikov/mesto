import Card from "./Card.js";
import { 
  initialCards, 
  formData, 
  profilePopup,
  profileEditButton,
  profileForm,
  cardPopup,
  cardAddButton,
  cardForm,
  cardTemplate,
} from "./constants.js"
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// функция для редактирования профиля
const userinfo = new UserInfo(formData);

// функция открытия попапа с картинкой
const openImage = new PopupWithImage('.popup_type_image');

// функция создания карточек из массива
const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, openImage.open, cardTemplate);
      const cardElement = card.generateCard();
      return cardElement;
    }
  },
  '.elements'
);

// функция добавления карточек из массива
section.renderItems();

// Валидация формы редактирования профиля и ее запуск
const profileFormValidator = new FormValidator(formData, profileForm);
profileFormValidator.enableValidation();

// Валидация формы создания карточки и ее запуск
const cardFormValidator = new FormValidator(formData, cardForm);
cardFormValidator.enableValidation();

// Создание карты через плюс
const popupAddCard = new PopupWithForm('.popup_type_card', '.popup__content', (data) => {
  section.addItem(data);
  popupAddCard.close();
});

// Редактирование профиля
const popupEditProfile = new PopupWithForm('.popup_type_profile', '.popup__content', (data) => {
  userinfo.setUserInfo(data);
  popupEditProfile.close();
});

// слушатель на кнопку "плюс"
cardAddButton.addEventListener('click', () => {
  popupAddCard.open();
  cardFormValidator.resetValidation();
});

// слушатель на кнопку "редактировать профиль"
profileEditButton.addEventListener('click', () => {
  popupEditProfile.open();
  profileFormValidator.resetValidation();
  popupEditProfile.setInputValues(userinfo.getUserInfo()); // заполняем инпуты при открытии
});





// СТАРЫЙ КОД 

//const profileCloseButton = profilePopup.querySelector('.popup__close-icon');
//const profileName = document.querySelector('.profile__title');
//const profileJob = document.querySelector('.profile__subtitle');
//const nameInput = document.querySelector('[name="name"]');
//const jobInput = document.querySelector('[name="role"]');
//const cardsContainer = document.querySelector('.elements');
//const cardCloseButton = cardPopup.querySelector('.popup__close-icon');
//const imageCloseButton = imagePopup.querySelector('.popup__close-icon');
//const titleInput = document.querySelector('[name="title"]');
// const linkInput = document.querySelector('[name="link"]');
// const imagePopupImage = imagePopup.querySelector('.popup__image');
// const imagePopupCaption = imagePopup.querySelector('.popup__caption');
// const popups = document.querySelectorAll('.popup');
//const imagePopup = document.querySelector('.popup_type_image');

// // Слушатели
//profileEditButton.addEventListener('click', /*openProfilePopup*/console.log('клик'));
// profileCloseButton.addEventListener('click', () => closePopup(profilePopup));

// //buttonAddCard.addEventListener("click", () => {
//   popupAddNewCard.open();
//   formAddCardValidator.resetErrorForOpenForm(); 

// cardCloseButton.addEventListener('click', () => closePopup(cardPopup));
// imageCloseButton.addEventListener('click', () => closePopup(imagePopup));

// // class ушло в Popup
// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target === popup) {
//       closePopup(popup);
//     }
//   });
// });

//profileForm.addEventListener('submit', handleSubmitProfileForm);
//cardForm.addEventListener('submit', handleSubmitCardForm);

// // Функции

// // ушло в class Popup
// function closePopupEsc(evt) {
//   if (evt.key === 'Escape') {
//     const modal = document.querySelector('.popup_opened');
//     closePopup(modal);
//   }
// }

// // коллбэк сабмита формы PopupWithForm
// function handleSubmitProfileForm(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(profilePopup);
// }

// // ушло в class PopupWithImage
// function openImage(data) {
//   imagePopupImage.src = data.link;
//   imagePopupImage.alt = data.name;
//   imagePopupCaption.textContent = data.name;
//   openPopup(imagePopup);
// }

// // коллбэк сабмита формы PopupWithForm
// function handleSubmitCardForm(evt) {
//   evt.preventDefault();
//   const newCard = {
//     name: titleInput.value,
//     link: linkInput.value,
//   };

//   renderCard(newCard);
//   closePopup(cardPopup);
//   //evt.target.reset();
// }

// //ушло в class Section
// initialCards.forEach((data) => {
//   renderCard(data);
// });


// function renderCard(card) {
//   cardsContainer.prepend(createCard(card))
// }

// // ушло в class Popup
// function openPopup(modal) {
//   modal.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEsc);
// }

// // ушло в class Popup
// function closePopup(modal) {
//   modal.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupEsc);
// }

// // ушло в class UserInfo
// function openProfilePopup() {
//   openPopup(profilePopup);
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   profileFormValidator.resetValidation();
// }

// function openCardPopup() {
//   openPopup(cardPopup);
//   cardFormValidator.resetValidation();
// }

// function createCard(data) {
//   const card = new Card(data, openImage, cardTemplate);
//   const cardElement = card.generateCard();
//   return cardElement;
// }

//  popupAddCard.close(); 






