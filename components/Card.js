export default class Card {
    constructor({name, link}, cardSelector, handleCardClick){
        this._title = name;
        this._image = link;  
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._handleCardClick(cardPic, this._title, this._image);
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
}

