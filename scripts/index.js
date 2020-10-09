import {Card} from './card.js'; 
export {gallery, zoom, forms, zoomImg, zoomTitle, openPopup};
const forms = document.querySelectorAll('.form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
const addButton = document.querySelector('.profile__button_action_add');
const editButton = document.querySelector('.profile__button_action_edit');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const titleName = document.querySelector('.form__item_action_edit-title');
const linkName = document.querySelector('.form__item_action_edit-link');
const zoom = document.querySelector('.zoom');
const nameInput = document.querySelector('.form__item_action_edit-name');
const jobInput = document.querySelector('.form__item_action_edit-job');
const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__card');
const zoomTitle = document.querySelector('.zoom__title'); 
const zoomImg = document.querySelector('.zoom__image'); 
const formElement = document.querySelector('.form');
const cardForm = document.querySelector('.form__card');
let popupOpened = document.querySelector('.popup__opened');
const gallery = document.querySelector('.gallery');

function handleZoom (titleValue, imageValue) {
    openPopup(zoom);
    zoomTitle.textContent = titleValue; 
    zoomImg.setAttribute('src', imageValue); 
    zoomImg.alt = titleValue; 
}

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        evt.target.classList.remove("popup__opened");
    })
});

function closePopup(){
    popupOpened.classList.remove('popup__opened');
    document.removeEventListener('keydown', closeEsc);
}

closeButtons.forEach((button) => {
     button.addEventListener('click', closePopup);
})

function closeEsc (evt){
    if(evt.key === 'Escape') {
        closePopup();
    }
}

function openPopup (popup) {
    popup.classList.add('popup__opened');
    popupOpened = document.querySelector('.popup__opened');
    document.addEventListener('keydown', closeEsc);
}

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
});

editButton.addEventListener('click', () => {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent; 
    openPopup(popupEdit);
});

function submitFormHandler () {
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', submitFormHandler);

function submitCardHandler () {
    const data = {
    name : titleName.value,
    link : linkName.value,
    }
    const card = new Card(data, '#card-template');
    const cardElement = card.renderCard();
    gallery.prepend(cardElement);
    titleName.value = '';
    linkName.value = '';
    closePopup();
}

cardForm.addEventListener('submit', submitCardHandler);