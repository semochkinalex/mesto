import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
    constructor (popupSelector, callback){
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._callback = callback
    }   
    _getInputValues () {
        const inputs = Object.assign(this._popup.querySelectorAll('.form__item'));
        return inputs;
    }
    setEventListeners() {
        this._popup.addEventListener('submit', () => {
            this._callback()
        });
        super.setEventListeners();
    }  
    close() { 
        super.close();
        const inputs = this._getInputValues();
        inputs.forEach((input) => {
            input.value = '';
        })
    } 
}
