import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._zoomTitle = this._popup.querySelector('.zoom__title');
        this._zoomImg = this._popup.querySelector('.zoom__image');
    }
    open({title, link}){
        this._zoomTitle.textContent = title;
        this._zoomImg.alt = title;
        this._zoomImg.src = link;
        super.open();
    }
}