import Popup from './Popup.js';
import {zoomTitle, zoomImg} from './index.js';
export default class PopupWithImage extends Popup{
    constructor (popupSelector) {
        super(popupSelector);
        this._title = 'hello';
        this._link = 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg';
    }
    open () {
        zoomTitle.textContent = this._title; 
        zoomImg.setAttribute('src', this._image); 
        zoomImg.alt = this._title; 
        super.open();
    }
    // test() {
    //     console.log(this._popupSelector);
    // }
}