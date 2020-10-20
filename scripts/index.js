import {Card} from './Card.js'; 
import {FormValidator} from './FormValidation.js';
import {initialCards} from './cards.js';
import {selectors} from './selectors.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';

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
// const popupEdit = document.querySelector('.popup__edit');
// const popupAdd = document.querySelector('.popup__card');
const zoomTitle = document.querySelector('.zoom__title'); 
const zoomImg = document.querySelector('.zoom__image'); 
const formElement = document.querySelector('.form');
const cardForm = document.querySelector('.form__card');
const gallery = document.querySelector('.gallery');
const editClose = document.querySelector('.popup__edit-close');
const addClose = document.querySelector('.popup__add-close');
const popupSelectors = ['.popup__edit', '.popup__card', 'zoom'];

// const test = new PopupWithImage('hello');
// test.test();

let popupOpened = 0;

const cardList = new Section({data : initialCards, renderer: (item) => {
    renderCard(item);
}}, '.gallery');
cardList.renderItems();

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup__opened')){

        }
    })
});

function handleZoom () {
    const zoom = new PopupWithImage('zoom');

}

function renderCard(item) {
    const card = new Card(item, '#card-template');
    const cardElement = card.renderCard();
    cardList.addItem(cardElement);
}

editButton.addEventListener('click', () => {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent; 
});
const editPopup = new Popup('.popup__edit');
editPopup.setEventListeners(editButton, editClose);

const addPopup = new Popup('.popup__card');
addPopup.setEventListeners(addButton, addClose);

// const addPopup = new Popup('.popup__card');
// addPopup.setEventListeners(addButton, addClose);

forms.forEach((form) => {
    const formValidation = new FormValidator(selectors, form);
    formValidation.enableValidation();
    form.addEventListener('submit', () => {
        formValidation.cleanErrors();
    })
})



function submitFormHandler () {
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    editPopup.close();
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
    addPopup.close();
}
cardForm.addEventListener('submit', submitCardHandler);

export {gallery, zoom, forms, zoomImg, zoomTitle};