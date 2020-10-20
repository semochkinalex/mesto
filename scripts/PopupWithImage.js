import Popup from './Popup.js';
import {zoomTitle, zoomImg} from './index.js';
export default class PopupWithImage extends Popup{
    constructor (popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector)
    }
    open(title, link){
        super.open();
        zoomTitle.textContent = title; 
        zoomImg.setAttribute('src', link); 
        zoomImg.alt = title; 
    }

    setEventListeners(openButton, closeButton, title, link){
        openButton.addEventListener('click', () => {
            this.open(title, link);
        })
        closeButton.addEventListener('click', () => {
            super.close();
        })
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup__opened')){
                super.close();
            }
        })
    }
}