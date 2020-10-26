// Константы
import './index.css';

import {
    addButton, editButton, closeCard, closeEdit,
    titleName, linkName,
    nameInput, jobInput, zoomTitle, zoomImg,
    initialCards, selectors, formCard, formEdit
} from '../utils/constants.js';

import Card from '../components/Card.js'; 
import FormValidator from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// FormCard

const cardValidationHandler = new FormValidator(selectors, formCard);
cardValidationHandler.enableValidation();

// FormEdit

const editValidationHandler = new FormValidator(selectors, formEdit);
editValidationHandler.enableValidation();

const editHandler = new UserInfo('.profile__name', '.profile__job');

const imagePopup = new PopupWithImage('.zoom');
imagePopup.setEventListeners();

const cardList = new Section({data : initialCards, renderer: (item) => {
    renderCard(item);
}}, '.gallery');
cardList.renderItems();

function renderCard(item) {
    const card = new Card(item, '#card-template', (button, title, image) => {
        button.addEventListener('click', () => {
            imagePopup.open(
                {
                    title: title,
                    link: image,
                }
            );
        })
    });
    const cardElement = card.renderCard();
    cardList.addItem(cardElement);
}
    
// addPopup

const addPopup = new PopupWithForm ('.popup__card', ({title, link}) => {
    const data = {
        name : title,
        link : link,
    }
    renderCard(data);
    cardValidationHandler.cleanErrors();
    addPopup.close();
})

addButton.addEventListener('click', () => {
    cardValidationHandler.cleanErrors();
    addPopup.open();
})
addPopup.setEventListeners();

addPopup._getInputValues();

// editPopup

const editPopup = new PopupWithForm ('.popup__edit', ({name, job}) => {
    editHandler.setUserInfo({
        userInput: name,
        jobInput: job,
    });
    editValidationHandler.cleanErrors();
    editPopup.close();
});

editButton.addEventListener('click', () => {
    const info = editHandler.getUserInfo();
    nameInput.value = info.userName;
    jobInput.value = info.userJob;
    editValidationHandler.cleanErrors();
    editPopup.open();
});

editPopup.setEventListeners();

export {zoomImg, zoomTitle};