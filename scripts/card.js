import {gallery, handleZoom} from './index.js';
import {initialCards} from './cards.js';
export {Card};
class Card {
    constructor(data, cardSelector){
        this._title = data.name;
        this._image = data.link;  
        this._cardSelector = cardSelector;
        this.isLiked = false;
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
        this._element = this._getTemplate();
        const deleteButton = this._element.querySelector('.gallery__delete-button');
        const likeButton = this._element.querySelector('.gallery__like-button');
        const cardPic = this._element.querySelector('.gallery__item-image');
        this._deleteCard(deleteButton);
        this._like(likeButton);
        this._openZoom(cardPic);
    }
    _deleteCard (button) {
        button.addEventListener('click', () => {
            button.parentElement.remove();
        })  
    }
    _like (button) {
        button.addEventListener('click', () => {
            button.classList.toggle('gallery__like-button_liked');
        })
    }
    _openZoom (button) {
        button.addEventListener('click', () => {
            handleZoom(this._title, this._image);
        })
    }
}
initialCards.forEach((item) => {
    const card = new Card(item, '#card-template');
    const cardElement = card.renderCard();
    gallery.prepend(cardElement);
})
