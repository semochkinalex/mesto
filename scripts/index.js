import {Card} from './Card.js'; 
import {selectors, FormValidator} from './FormValidation.js';
import {initialCards} from './cards.js';

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

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup__opened')){
            closePopup();
        }
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

const renderCard = (data) => {
    const card = new Card(data, '#card-template');
    gallery.prepend(card.renderCard());
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

forms.forEach((form) => {
    const formValidation = new FormValidator(selectors, form);
    formValidation.enableValidation(form);
    form.addEventListener('submit', () => {
        formValidation.cleanErrors();
    })
})

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
    renderCard(data);
    titleName.value = '';
    linkName.value = '';
    closePopup();
}
cardForm.addEventListener('submit', submitCardHandler);

initialCards.forEach((item) => {
    renderCard(item);
})

export {gallery, zoom, forms, zoomImg, zoomTitle, openPopup};

