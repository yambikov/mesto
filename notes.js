export default class Card {
  constructor(data, handleCardClick, cardTemplate, openPopupWithConfirm, userID) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userID;
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._openPopupWithConfirm = openPopupWithConfirm;
    this.cardTemplate = cardTemplate;

    this.likesCounter = this._likes.length;
  }

  setLikesUpdater(likesUpdater) {
    this._likesUpdater = likesUpdater;
  }

  isLikedByUser() {
    return this._likes.some(like => like._id === this._userId);
  }
  

  activateLike() {
    this._buttonLike.classList.add('element__like_active');
  }

  deactivateLiked() {
    this._buttonLike.classList.remove('element__like_active');
  }

  _hideRemoveButton() {
    if (this._ownerId !== this._userId) {
      this._buttonRemove.remove();
    }
  }

  _setEventListeners() {
    this._buttonRemove.addEventListener('click', () => {
      this._openPopupWithConfirm.open(this._cardId);
    });

    this._buttonLike.addEventListener('click', () => {
      // 1. Здесь нужно передать информацию на сервер, что произошел клик на лайк
      console.log('like clicked!');
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  _getTemplate() {
    const template = this.cardTemplate.content.querySelector('.element').cloneNode(true);
    return template;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._buttonLike = this._element.querySelector('.element__like');
    this._buttonRemove = this._element.querySelector('.element__remove');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._likeContainer = this._element.querySelector('.element__like-counter');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._likeContainer.textContent = this._likes.length;

    this._hideRemoveButton();

    if (this.isLikedByUser()) {
      this.activateLike(); // Карточка лайкнута
    } else {
      this.deactivateLiked(); // Карточка не лайкнута
    }

    return this._element;
  }
}

////////////
















////////////

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
const openPopupWithConfirm = new PopupWithConfirm('.popup_type_delete-card', (cardId, card) => {
  api.deleteCard(cardId)
    .then(() => {
      openPopupWithConfirm.close();
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

// Создание попапа для редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_type_profile', '.popup__content', (data) => {
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

// Создание карточки и добавление ее в разметку
const section = new Section(
  {
    renderer: (data) => {
      const card = new Card(data, openImage.open, cardTemplate, openPopupWithConfirm, userID);
      const cardElement = card.generateCard();

      card.setLikesUpdater((isLiked, cardId) => { // Вот здесь использование setLikesHandler
        console.log((isLiked));
        if (isLiked) {
          api.deleteLike(cardId)
            .then(updatedCardData => {
              // console.log(updatedCardData.likes);
              // еще нужно отобразить длину массива с лайками, когда ответ от сервера будет получен
              card.updateLikes(updatedCardData.likes);
              card.activateLike();
              
            })
            .catch(error => {
              console.error('Ошибка при удалении лайка:', error);
            });
        } else {
          api.putLike(cardId)
            .then(updatedCardData => {
              card.updateLikes(updatedCardData.likes);
              card.deactivateLiked();
            })
            .catch(error => {
              console.error('Ошибка при добавлении лайка:', error);
            });
        }
      });

      return cardElement;
    }
  },
  '.elements'
);



// Создание попапа для добавления карточки
const popupAddCard = new PopupWithForm('.popup_type_card', '.popup__content', (data) => {
  api.postCard(data)
    .then((cardData) => {
      section.addItem(cardData);
      popupAddCard.close();
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




  ///////////////////







  ///////////////////


  export default class Card {
    constructor(data, handleCardClick, cardTemplate, openPopupWithConfirm, userID) {
      this._data = data;
      this._link = data.link;
      this._name = data.name;
      this._likes = data.likes;
      this._ownerId = data.owner._id;
      this._userId = userID;
      this._cardId = data._id;
      this._handleCardClick = handleCardClick;
      this._openPopupWithConfirm = openPopupWithConfirm;
      this.cardTemplate = cardTemplate;
  
      this.likesCounter = this._likes.length;
    }
  
    setLikesHandler(likesHandler) {
      this._likesHandler = likesHandler;
    }
  
    isLiked = () => {
      return this._likes.some(like => like._id === this._userId);
    }
  
    likesHandler() {
      if (this._likesHandler) {
        this._likesHandler(this.isLiked(), this._cardId);
      }
    }
  
   
  
    addStatusLiked() {
      this._buttonLike.classList.add('element__like_active');
    }
  
    removeStatusLiked() {
      this._buttonLike.classList.remove('element__like_active');
    }
  
    _hideRemoveButton() {
      if (this._ownerId !== this._userId) {
        this._buttonRemove.remove();
      }
    }
  
    _setEventListeners() {
      this._buttonRemove.addEventListener('click', () => {
        this._openPopupWithConfirm.open(this._cardId, this);
      });
  
      this._buttonLike.addEventListener('click', () => {
        this.likesHandler();
        // this._handleLikeClick(this._id);
      });
  
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._data);
      });
    }
  
    _getTemplate() {
      const template = this.cardTemplate.content.querySelector('.element').cloneNode(true);
      return template;
    }
  
    generateCard() {
      this._element = this._getTemplate();
  
      this._buttonLike = this._element.querySelector('.element__like');
      this._buttonRemove = this._element.querySelector('.element__remove');
      this._cardImage = this._element.querySelector('.element__image');
      this._cardTitle = this._element.querySelector('.element__title');
      this._likeContainer = this._element.querySelector('.element__like-counter');
  
      this._setEventListeners();
  
      this._cardImage.src = this._link;
      this._cardTitle.textContent = this._name;
      this._cardImage.alt = this._name;
      this._likeContainer.textContent = this._likes.length;
  
      this._hideRemoveButton();
      this.likesHandler()
  
      return this._element;
    }
  }

