// Константы
import './index.css';

import {
    addButton, editButton, closeCard, closeEdit,
    titleName, linkName,
    nameInput, jobInput, zoomTitle, zoomImg,
    initialCards, selectors, formCard, formEdit, // Delete unused constants
    confirmationForm, editAvatarButton, formAvatarEdit,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import Api from '../components/Api.js';

// Cardlist

const cardList = new Section({
    data: initialCards, renderer: (item) => {
        renderCard(item);
    }
}, '.gallery');

// Api

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {"Content-Type" : "applicationes/json"},
    token: '16bbf0d2-da12-4d9c-809d-74b46ac64585',
});  //'https://mesto.nomoreparties.co/v1/cohort-17', '16bbf0d2-da12-4d9c-809d-74b46ac64585'

// Initail cards

const serverCards = api.getInitialCards();
serverCards.then((res) => {
    cardList.renderItems(res);
})

// Profile information and edit.

const initialsInfo = api.getInitialsInfo();

initialsInfo.then((res) => {
    editHandler.setUserInfo ({
        userInput: res.name,
        jobInput: res.about,
    })
    editHandler.setUserAvatar(res.avatar);
})

// fetch('https://mesto.nomoreparties.co/v1/cohort-17/users/me', {
//     headers: {
//         authorization: '16bbf0d2-da12-4d9c-809d-74b46ac64585'
//     }
// })
//     .then(res => res.json())
//     .then((res) => {
//         JSON.stringify(res);
//         editHandler.setUserInfo({
//             userInput: res.name,
//             jobInput: res.about,
//         });
//         editHandler.setUserAvatar(res.avatar);
//     });

// AvatarEdit

const editAvatarValidationHandler = new FormValidator(selectors, formAvatarEdit);
editAvatarValidationHandler.enableValidation();  // Enable cleanErrors for this class.

// Profile avatar edit

const editAvatarPopup = new PopupWithForm('.popup__edit_action_avatar', (input) => {
    editHandler.setUserAvatar(input.avatar);
    editAvatarPopup.close();

    // Sending data to the server


    const profileAvatar = editHandler.getUserAvatar();

    fetch('https://mesto.nomoreparties.co/v1/cohort-17/users/me/avatar ', {
        method: 'PATCH',
        headers: {
            authorization: '16bbf0d2-da12-4d9c-809d-74b46ac64585',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: profileAvatar.userAvatar,
        })
    });
});

editAvatarButton.addEventListener('click', () => {
    editAvatarValidationHandler.cleanErrors();
    editAvatarPopup.open();
})

editAvatarPopup.setEventListeners();

// editPopup

const editPopup = new PopupWithForm('.popup__edit', ({ name, job }) => {
    editHandler.setUserInfo({
        userInput: name,
        jobInput: job,
    });
    editValidationHandler.cleanErrors();
    editPopup.close();
    fetch('https://mesto.nomoreparties.co/v1/cohort-17/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '16bbf0d2-da12-4d9c-809d-74b46ac64585',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: job,
        })
    });
});

editButton.addEventListener('click', () => {
    const info = editHandler.getUserInfo();
    nameInput.value = info.userName;
    jobInput.value = info.userJob;
    editValidationHandler.cleanErrors();
    editPopup.open();
});

editPopup.setEventListeners();

// Initial cards

// fetch('https://mesto.nomoreparties.co/v1/cohort-17/cards', {
//     headers: {
//         authorization: '16bbf0d2-da12-4d9c-809d-74b46ac64585'
//     }
// })
//     .then((res) => {
//         return res.json();
//     })
//     .then((res) => {
//         JSON.stringify(res);
//         console.log(res);
//         cardList.renderItems(res); // Лучше спросить в слаке
//     });

// FormCard

const cardValidationHandler = new FormValidator(selectors, formCard);
cardValidationHandler.enableValidation();

// addPopup

const addPopup = new PopupWithForm('.popup__card', ({ title, link }) => {
    const data = {
        name: title,
        link: link,
    }
    renderCard(data);
    cardValidationHandler.cleanErrors();
    addPopup.close();

    fetch('https://mesto.nomoreparties.co/v1/cohort-17/cards', {
        method: 'POST',
        headers: {
            authorization: '16bbf0d2-da12-4d9c-809d-74b46ac64585',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: title,
            link: link,
        })
    });
})

addButton.addEventListener('click', () => {
    cardValidationHandler.cleanErrors();
    addPopup.open();
})
addPopup.setEventListeners();

addPopup._getInputValues();

// FormEdit

const editValidationHandler = new FormValidator(selectors, formEdit);
editValidationHandler.enableValidation();

const editHandler = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

const imagePopup = new PopupWithImage('.zoom');
imagePopup.setEventListeners();

function renderCard(item) {
    const card = new Card(item, '#card-template', (button, title, image) => {
        button.addEventListener('click', () => {
            card._handleLikeButton(button);
            imagePopup.open(
                {
                    title: title,
                    link: image,
                }
            );
        })
    },
        (button) => {
            confirmationPopup.open();
            confirmationForm.addEventListener('submit', (evt) => { // I think refactor may be applied
                evt.preventDefault();
                confirmationPopup.close();
                button.parentElement.remove();
            })

        },)
    const cardElement = card.renderCard();
    cardList.addItem(cardElement);
}

// fetch(`https://mesto.nomoreparties.co/v1/cohort-17/cards/likes/5fa29ee7fca8c000111d9178`, {
//     method: 'PUT',
//     headers: {
//         authorization: '16bbf0d2-da12-4d9c-809d-74b46ac64585',
//         'Content-Type': 'application/json'
//     },
// })
//     .then((res) => {
//         console.log(res);
//     })

// Delete confirmation

const confirmationPopup = new Popup('.confirmation');
confirmationPopup.setEventListeners();

export { zoomImg, zoomTitle };