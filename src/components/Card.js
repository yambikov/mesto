import { data } from "autoprefixer";

export default class Card {
  constructor(data, handleCardClick, cardTemplate, openPopupWithConfirm, userID, likeData) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    // this._like = data.likes.length;
    this._likes = data.likes;
    this._id = data.owner._id;
    this._userId = userID;
    this._cardId = data._id;
    this._card = this;
    // this._id и this._userId - это одно и тоже 

    this._handleCardClick = handleCardClick;
    this._openPopupWithConfirm = openPopupWithConfirm;
    this.cardTemplate = cardTemplate;
    this.likesCount = data.likes.length;
    this._handleLikeClick = likeData;

    // this._buttonLike = document.querySelector('.element__like'); 
  }

likesCounter(res) {
  this.likesCount = res.likes.length;
  console.log(res);
  this._likeContainer.textContent = this.likesCount;
  this._buttonLike.classList.toggle('element__like_active');
}

  // addLikeToCounter(){
  //   this.likesCount++;
  //   console.log(this.likesCount);
  // }

  dataChecker() {
    
    console.log(this._data);
    console.log(this._likes.length);
    // console.log(this._cardId);
    // console.log('======================================================================================================================================================================================================');
  }

  // addLikeToCounter() {
  //   this.likesCount++;
  //   this._likeContainer.textContent = this.likesCount;
  // }

  // deleteLikeFromCounter(){
  //   this.likesCount--;
  //   this._likeContainer.textContent = this.likesCount;
  // }


  likesTransfer() {
    this._handleLikeClick(this._cardId);
  }

  
  

  // setLikesUpdater() {
  //   this._callback(newData);
  //   console.log(this._cardId);
  //   console.log(this._id);
  //   console.log(this._userId);


  //   // this._likesUpdater = likesUpdater;
  // }

  // likeButtonHandler () {
  //   if (this.isLikedByUser() === true) {
  //     console.log('вкл лайк');
  //     this._buttonLike.classList.add('element__like_active');
  //   } else {
  //     console.log('выкл лайк');
  //     this._buttonLike.classList.remove('element__like_active');
  //     this.isLikedByUser.toggle

  //   }
  // }

  likeButtonHandler() {
    if (this.isLikedByUser()) {
      console.log('вкл лайк');
      this._buttonLike.classList.add('element__like_active');
    } else {
      console.log('выкл лайк');
      this._buttonLike.classList.remove('element__like_active');
    }
  }
  



  isLikedByUser() {
    const isLiked = this._likes.some(item => item._id === this._userId);
  
    console.log(`Checking if any item is liked by user ${this._userId}: ${isLiked}`);
    
    return isLiked; // true or false 
  }
  

  // isLikedByUser() {
  //   return this._likes.some(like => like._id === this._userId);
  // }


  // activateLike() {
  //   this._buttonLike.classList.add('element__like_active');
  // }

  // deactivateLiked() {
  //   this._buttonLike.classList.remove('element__like_active');
  // }

  _getTemplate() {
    const template = this.cardTemplate
      .content.querySelector('.element')
      .cloneNode(true);

    return template;
  }

  removeCard() {
    this._element.remove();
  }

  // _handleLikeButton() {
  //   this._buttonLike.classList.toggle('element__like_active');
  // }

  _openPopupImage() {
    this._handleCardClick(this._data);
  }

  _openPopupWithDelete() {
    this._openPopupWithConfirm.open(this._cardId, this._card);
  }

  _setEventListeners() {
    this._buttonRemove.addEventListener('click', () => {
      this._openPopupWithDelete();
    });

    this._buttonLike.addEventListener('click', () => {
      this.likesTransfer();
      this.dataChecker();

    });

    this._cardImage.addEventListener('click', () => {
      this._openPopupImage();
    });
  }

  _hideRemoveButton() {
    this._buttonRemove = this._element.querySelector('.element__remove');

    if (this._id !== this._userId) {
      this._buttonRemove.remove();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like'); 

    this._hideRemoveButton();
    // this.isLikedByUser();

    this._buttonLike.classList.add('element__like_active');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._likeContainer = this._element.querySelector('.element__like-counter');

    this._setEventListeners();
    // this.dataChecker();

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._likeContainer.textContent = this.likesCount;

    // if (this.isLikedByUser()) {
    //   this.activateLike();
    // } else {
    //   this.deactivateLiked();
    // }

    this.likeButtonHandler ()

    return this._element;
  }
}
