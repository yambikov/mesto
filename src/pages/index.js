import '../pages/index.css';
import Card from "../components/Card.js";
import {
  formData,
  profileEditButton,
  profileForm,
  cardAddButton,
  cardForm,
  cardTemplate,
  initialCards
} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import { data } from 'autoprefixer';


// Конфигурация для API
const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72/',
  headers: {
    authorization: 'baec5030-e66a-4791-88f5-1a246d578a5b',
    'Content-Type': 'application/json'
  }
};

// Функция открытия попапа с картинкой
const openImage = new PopupWithImage('.popup_type_image');

// Функция для редактирования профиля
const userinfo = new UserInfo(formData);

// Валидация формы редактирования профиля и ее запуск
const profileFormValidator = new FormValidator(formData, profileForm);
profileFormValidator.enableValidation();

// Валидация формы создания карточки и ее запуск
const cardFormValidator = new FormValidator(formData, cardForm);
cardFormValidator.enableValidation();



// Создание попапа для редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_type_profile', '.popup__content', (data) => {
  console.log(data); // Выводим данные формы в консоль для отладки

  // Отправляем данные на сервер для обновления профиля
  api.patchUserInfo(data)
    .then(userData => {
      userinfo.setUserInfo(userData); // Обновляем информацию о пользователе на странице
      popupEditProfile.close(); // Закрываем попап после успешного обновления профиля
    })
    .catch((error) => {
      console.error('Ошибка при редактировании профиля:', error); // Выводим ошибку в консоль при возникновении ошибки
    });
});



// Слушатель на кнопку "Добавить карточку"
cardAddButton.addEventListener('click', () => {
  popupAddCard.open();
  cardFormValidator.resetValidation();
});

// Слушатель на кнопку "Редактировать профиль"
profileEditButton.addEventListener('click', () => {
  popupEditProfile.open();
  profileFormValidator.resetValidation();
  popupEditProfile.setInputValues(userinfo.getUserInfo()); // Заполняем инпуты при открытии попапа
});

// Создание экземпляра класса Api с переданным конфигурационным объектом 'apiConfig'
const api = new Api(apiConfig);

// Функция, создающая карточку на основе переданных данных
// function createCard(data) {
//   const card = new Card(data, openImage.open, cardTemplate);
//   const cardElement = card.generateCard();
//   return cardElement;
// };


// функция создания карточек
const section = new Section(
  {
    // items: initialCards,
    renderer: (data) => {
      const card = new Card(data, openImage.open, cardTemplate);
      const cardElement = card.generateCard();
      return cardElement;
    }
  },
  '.elements',
);

// section.renderItems();

// // Функция для рендеринга начальных карточек
// function renderInitialCards(cardsData) {
//   // Создание секции для карточек
//   const section = new Section({
//     items: cardsData, // В items добавляю данные, полученные из API
//     renderer: createCard // Используем функцию createCard для генерации карточек
//   }, '.elements');

//   // Функция добавления карточек из массива
  
// }

// Создание попапа для добавления карточки
const popupAddCard = new PopupWithForm('.popup_type_card', '.popup__content', (data) => {
  console.log(data);
  section.addItem(data);
  popupAddCard.close();
});


// Promise.all для параллельного выполнения запросов
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    console.log([userData, cardsData]);
    section.renderItems(cardsData);
    userinfo.setUserInfo(userData);
  })
  .catch((error) => {
    // Обработка ошибок, если хотя бы один запрос завершился с ошибкой
    console.error(error);
  });

// api.postCard({
//   name: "Оренбуржье",
//   link: "https://s0.showslide.ru/s_slide/5cfe/7e823f37-1279-4359-aaeb-54de53d5da05.jpeg"
// })
