import Popup from './Popup.js';
import {zoomTitle, zoomImg} from '../pages/index.js';

export default class PopupWithImage extends Popup{
    open(title, link){
        zoomTitle.textContent = title;
        zoomImg.alt = title;
        zoomImg.src = link;
        super.open();
    }
}