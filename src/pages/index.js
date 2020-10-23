// Константы
// import './index.css';

import {
    forms, addButton, editButton,
    titleName, linkName,
    nameInput, jobInput, zoomTitle, zoomImg,
    initialCards, selectors,
} from '../utils/constants.js';

import Card from '../components/Card.js'; 
import FormValidator from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editHandler = new UserInfo('.profile__name', '.profile__job');

const cardList = new Section({data : initialCards, renderer: (item) => {
    renderCard(item);
}}, '.gallery');
cardList.renderItems();

function renderCard(item) {
    const card = new Card(item, '#card-template', (button, title, image) => {
        button.addEventListener('click', () => {
            const imagePopup = new PopupWithImage('.zoom');
            imagePopup.setEventListeners();
            imagePopup.open(title, image);
        })
    });
    const cardElement = card.renderCard();
    cardList.addItem(cardElement);
}

// addPopup

const addPopup = new PopupWithForm ('.popup__card', () => {
    const data = {
        name : titleName.value,
        link : linkName.value,
    }
    renderCard(data);
    addPopup.close();
})
addButton.addEventListener('click', () => {
    addPopup.open();
})
addPopup.setEventListeners();

addPopup._getInputValues();

// editPopup

const editPopup = new PopupWithForm ('.popup__edit', () => {
    editHandler.setUserInfo(nameInput.value, jobInput.value);
    editPopup.close();
});

editButton.addEventListener('click', () => {
    const info = editHandler.getUserInfo();
    nameInput.value = info.userName;
    jobInput.value = info.userJob;
    editPopup.open();
})

editPopup.setEventListeners();

// Валидация

forms.forEach((form) => {
    const formValidation = new FormValidator(selectors, form);
    formValidation.enableValidation();
    form.addEventListener('submit', () => {
        formValidation.cleanErrors();
    })
})

export {zoomImg, zoomTitle};