import '../pages/index.css';
import Card from "../components/Card.js";
import {
  formData,
  profileEditButton,
  profileForm,
  cardAddButton,
  cardForm,
  cardTemplate,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import PopupWithConfirm from '../components/popupWithConfirm.js';
import { data } from 'autoprefixer';

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__content');
const buttonAvatar = document.querySelector('.profile__avatar-update-button');

// ID пользователя для иконки корзины
const userID = "bba7060593119ffd8fc1af1f";

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

// Функция открытия попапа подтверждения удаления
const popupDelete = new PopupWithConfirm('.popup_type_delete-card', (cardId, card) => {
  api.deleteCard(cardId)
    .then(() => {
      popupDelete.close();
      card.removeCard();
    })
    .catch((error) => {
      console.error('Ошибка при редактировании профиля:', error); // Выводим ошибку в консоль при возникновении ошибки
    });
});

// Функция для редактирования профиля
const userinfo = new UserInfo(formData);

// Валидация формы редактирования профиля и ее запуск
const profileFormValidator = new FormValidator(formData, profileForm);
profileFormValidator.enableValidation();

// Валидация формы создания карточки и ее запуск
const cardFormValidator = new FormValidator(formData, cardForm);
cardFormValidator.enableValidation();

// Валидация формы редактирования аватара
const avatarEditValidaror = new FormValidator(formData, avatarForm);
avatarEditValidaror.enableValidation();



// Создание попапа для редактирования профиля
const popupProfile = new PopupWithForm('.popup_type_profile', '.popup__content', (data) => {
  // Отправляем данные на сервер для обновления профиля
  api.patchUserInfo(data)
    .then(userData => {
      userinfo.setUserInfo(userData); // Обновляем информацию о пользователе на странице
      popupProfile.close(); // Закрываем попап после успешного обновления профиля
    })
    .catch((error) => {
      console.error('Ошибка при редактировании профиля:', error); // Выводим ошибку в консоль при возникновении ошибки
    });
});


const popupAvatar = new PopupWithForm('.popup_type_avatar', '.popup__content', (data) => {
  api.patchAvatar(data)
    .then(res => (console.log(res)))
});




// Слушатель на кнопку редактирования аватара
buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
  avatarEditValidaror.resetValidation();

});


// Слушатель на кнопку "Добавить карточку"
cardAddButton.addEventListener('click', () => {
  popupCard.open();
  cardFormValidator.resetValidation();
});

// Слушатель на кнопку "Редактировать профиль"
profileEditButton.addEventListener('click', () => {
  popupProfile.open();
  profileFormValidator.resetValidation();
  popupProfile.setInputValues(userinfo.getUserInfo()); // Заполняем инпуты при открытии попапа
});

// Создание экземпляра класса Api с переданным конфигурационным объектом 'apiConfig'
const api = new Api(apiConfig);

// Создание карточки и добавление ее в разметку
const section = new Section(
  {
    renderer: (data) => {
      const card = new Card(data, openImage.open, cardTemplate, popupDelete, userID, (likeData) => { //likeData - связка с классом Card
        if (card.isLikedByUser(likeData)) { // true or false
          api.deleteLike(likeData)
            .then((res) => {
              card.likesHandler(res); // передаем результат удаления/добавления лайка в метод обновления карточки
            })
            .catch((err) => console.log(err));
        } else {
          api.putLike(likeData)
            .then((res) => {
              card.likesHandler(res);
            })
            .catch((err) => console.log(err));
        }
      });

      const cardElement = card.generateCard();

      return cardElement;
    }
  },
  '.elements'
);



// Создание попапа для добавления карточки
const popupCard = new PopupWithForm('.popup_type_card', '.popup__content', (data) => {
  api.postCard(data)
    .then((cardData) => {
      section.addItem(cardData);
      popupCard.close();
    })
    .catch((error) => {
      console.error(error);
    });
});

// Promise.all для параллельного выполнения запросов
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    section.renderItems(cardsData.reverse());
    userinfo.setUserInfo(userData);
  })
  .catch((error) => {
    console.error(error);
  });
