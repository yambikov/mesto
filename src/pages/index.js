import '../pages/index.css';
import Card from "../components/Card.js";
import {
  initialCards,
  formData,
  profileEditButton,
  profileForm,
  cardAddButton,
  cardForm,
  cardTemplate,
} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import { error, log } from 'console';
import { data } from 'autoprefixer';



// функция открытия попапа с картинкой
const openImage = new PopupWithImage('.popup_type_image');

// конфиг для API
const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72/',
  headers: {
    authorization: 'baec5030-e66a-4791-88f5-1a246d578a5b',
    'Content-Type': 'application/json'
  }
}

// функция для редактирования профиля
const userinfo = new UserInfo(formData);

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

// Создание экземпляра класса Api с переданным конфигурационным объектом 'apiConfig'
const api = new Api(apiConfig);

// Получение данных с API и рендеринг карточек на их основе
api.getInitialCards()
  .then((cardsData) => {
    // функция создания карточек из массива
    const section = new Section(
      {
        items: cardsData, // В items добавляю данные, полученные из API
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
  })
  .catch((error) => {
    console.log(error);
  });

// получение имени и должности с сервера и их публикация
api.getUserInfo()
  .then(data => {
    userinfo.setUserInfo(data)
  })
  .catch((error) => {
    console.log(error)
  })


