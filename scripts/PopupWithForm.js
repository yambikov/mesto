import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);


    this._form = this._popup.querySelector('.popup__content');
    this._button = this._form.querySelector('.popup__button');
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll('.popup__item');
    const formData = {};

    inputs.forEach(input => {
      formData[input.name] = input.value;
    });

    return formData;
  }

  setEventListeners() {
    super.setEventListeners();

    console.log('прошло');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues()); // данные
    });
  }


  close() {
    super.close();

    this._form.reset();
  }
}