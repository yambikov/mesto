import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, formSelector, handleSubmitForm) {
    super(popupSelector);
  
    this._form = this._popup.querySelector(formSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputs = Array.from(this._form.querySelectorAll('.popup__item'));
  }
  

  _getInputValues() {
    this._formData = {};
    this._inputs.forEach(input => {
      this._formData[input.name] = input.value;
    });
    return this._formData;
  }


  setEventListeners() {
    //super.setEventListeners();

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