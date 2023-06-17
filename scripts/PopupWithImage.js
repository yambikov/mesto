import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
    

  }

  open = (data) => { 
    //data из class Card
    // _openPopupImage() {
    //   this._handleCardClick(this._data); //openImage.open(this.data)
    //   console.log(this._data);
    // }
    
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;

    super.open();
  }
}