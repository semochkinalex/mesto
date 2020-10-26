import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, callback) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._callback = callback
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
            this._callback()
        });
        super.setEventListeners();
    }
    close() {
        super.close();
        const inputs = document.querySelectorAll('.form__item');
        inputs.forEach((input) => {
            input.value = '';
        })
    }
}
