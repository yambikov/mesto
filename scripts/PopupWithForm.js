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

    console.log(this._formData)

    return this._formData;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  removeEventListeners() {
    this._form.removeEventListener('submit', this._handleFormSubmit);
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._handleSubmitForm(this._getInputValues());
  }

  close() {
    super.close();
    this._form.reset();
    this.removeEventListeners();
  }
}
