export default class Card {
    constructor({name, link, _id, likes}, cardSelector, handleCardClick, handleDeleteConfirmation, handleLike){
        this._title = name;
        this._image = link;     
        this._id = _id;
        this._likeAmount = likes.length;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteConfirmation = handleDeleteConfirmation;
        this._handleLike = handleLike;
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
        this._likeCounter = this._element.querySelector('.gallery__like-counter');
        this._likeCounter.textContent = this._likeAmount;
        return this._element;
    }
    _setEventListeners () {
        const deleteButton = this._element.querySelector('.gallery__delete-button');
        const likeButton = this._element.querySelector('.gallery__like-button');
        const cardPic = this._element.querySelector('.gallery__item-image');
        this._element.querySelector('.gallery__like-counter').textContent = this._likeAmount;
        this._deleteCard(deleteButton);
        this._handleLikeButton(likeButton);
        this._handleCardClick(cardPic, this._title, this._image);
    }

    _deleteCard (button) {
        button.addEventListener('click', () => {
            this._handleDeleteConfirmation(button);
        })  
    }

    _handleLikeButton (button) {
        button.addEventListener('click', () => {
            button.classList.toggle('gallery__like-button_liked');
            if(button.classList.contains('gallery__like-button_liked')){
                this._handleLike(this._id, false);
                this._likeAmount += 1;
                this._likeCounter.textContent = this._likeAmount;

            } else {
                this._handleLike(this._id, true)
                this._likeAmount -= 1;
                this._likeCounter.textContent = this._likeAmount;
            }
        })
    }
}

