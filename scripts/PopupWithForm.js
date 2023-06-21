import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm ) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__content');
    this._button = this._form.querySelector('.popup__button');
    this._handleSubmitForm = handleSubmitForm;
    this._inputs = this._form.querySelectorAll('.popup__item');

  }

  _getInputValues() {

    this._formData = {};
    //console.log(this._formData)

    this._inputs.forEach(input => {
      //console.log(input.value)
      this._formData[input.name] = input.value;
      console.log(this._formData)
    });
    
    return this._formData;
    
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      //console.log(this._getInputValues())// данные
    });
  }


  close() {
    super.close();

    this._form.reset();
  }
}