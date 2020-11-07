export default class Card {
  constructor(
    { name, link, _id, likes, owner },
    cardSelector,
    handleCardClick,
    handleDeleteConfirmation,
    handleLike
  ) {
    this._title = name;
    this._image = link;
    this._id = _id;
    this._userId = "9db34bc2362ec132bb89ca68";
    this._owner = owner;
    this._ownerId = owner._id;
    this._likes = likes;
    this._likeAmount = likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteConfirmation = handleDeleteConfirmation;
    this._handleLike = handleLike;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    return cardElement;
  }
  renderCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(
      ".gallery__item-title"
    ).textContent = this._title;
    this._element.querySelector(".gallery__item-image").src = this._image;
    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._likeCounter = this._element.querySelector(".gallery__like-counter");
    this._likeCounter.textContent = this._likeAmount;

    if (this._likes.some(like => like._id === this._userId)) {
      this._element
        .querySelector(".gallery__like-button")
        .classList.add("gallery__like-button_liked");
    }

    return this._element;
  }

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".gallery__delete-button");
    const likeButton = this._element.querySelector(".gallery__like-button");
    const cardPic = this._element.querySelector(".gallery__item-image");
    this._deleteCard(deleteButton);
    this._handleLikeButton(likeButton);
    this._handleCardClick(cardPic, this._title, this._image);

    if (!(this._ownerId === this._userId)) {
      deleteButton.remove();
    }
  }

  _deleteCard(deleteButton) {
    deleteButton.addEventListener("click", () => {
      this._handleDeleteConfirmation(deleteButton, this._id);
    });
  }

  _handleLikeButton(button) {
    button.addEventListener("click", () => {
      button.classList.toggle("gallery__like-button_liked");
      if (button.classList.contains("gallery__like-button_liked")) {
        this._handleLike(this._id, true);
        this._likeAmount += 1;
        this._likeCounter.textContent = this._likeAmount;
      } else {
        this._handleLike(this._id, false);
        this._likeAmount -= 1;
        this._likeCounter.textContent = this._likeAmount;
      }
    });
  }
}
