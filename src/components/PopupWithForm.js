import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, callback) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._inputs = document.querySelectorAll('.form__item');
        this._callback = callback;
        this._formValues = {};
    }
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.form__item');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    setEventListeners() {
        this._popup.addEventListener('submit', () => {
            this._callback(this._getInputValues());
        });
        super.setEventListeners();
    }
    close() {
        super.close();
        this._inputs.forEach((input) => {
            input.value = '';
        })
    }
}
