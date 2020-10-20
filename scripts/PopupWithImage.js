import Popup from './Popup.js';
import {zoomTitle, zoomImg} from './index.js';
export default class PopupWithImage extends Popup{
    constructor (popupSelector) {
        super(popupSelector);
    }
    open(title, image) {
        super.open();
        zoomTitle.textContent = title; 
        zoomImg.setAttribute('src', image); 
        zoomImg.alt = title; 
        this._popup.classList.add('popup__opened');
    }
    // test() {
    //     console.log(this._popupSelector);
    // }
}