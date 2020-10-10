import {openPopup, zoom, zoomTitle, zoomImg} from './index.js';

class Card {
    constructor(data, cardSelector){
        this._title = data.name;
        this._image = data.link;  
        this._cardSelector = cardSelector;
    }
    _getTemplate () {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .cloneNode(true);
        return cardElement;
    }
    renderCard () {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.gallery__item-title').textContent = this._title;
        this._element.querySelector('.gallery__item-image').src = this._image;
        return this._element;
    }
    _setEventListeners () {
        const deleteButton = this._element.querySelector('.gallery__delete-button');
        const likeButton = this._element.querySelector('.gallery__like-button');
        const cardPic = this._element.querySelector('.gallery__item-image');
        this._deleteCard(deleteButton);
        this._handleLikeButton(likeButton);
        this._openZoom(cardPic);
    }
    _deleteCard (button) {
        button.addEventListener('click', () => {
            button.parentElement.remove();
        })  
    }
    _handleLikeButton (button) {
        button.addEventListener('click', () => {
            button.classList.toggle('gallery__like-button_liked');
        })
    }
    _openZoom (button) {
        button.addEventListener('click', () => {
            this._handleZoom();
        })
    }
    _handleZoom () {
        openPopup(zoom);
        zoomTitle.textContent = this._title; 
        zoomImg.setAttribute('src', this._image); 
        zoomImg.alt = this._title; 
    }
    
}

export {Card};