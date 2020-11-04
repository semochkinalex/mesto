export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
export const selectors = {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled_true',
    inputErrorClass: 'form__item_invalid',
    errorClass: 'form__input-error_active_true',
};
export const forms = document.querySelectorAll('.form');
export const addButton = document.querySelector('.profile__button_action_add');
export const editButton = document.querySelector('.profile__button_action_edit');
export const titleName = document.querySelector('.form__item_action_edit-title');
export const linkName = document.querySelector('.form__item_action_edit-link');
export const nameInput = document.querySelector('.form__item_action_edit-name');
export const jobInput = document.querySelector('.form__item_action_edit-job');
export const zoomTitle = document.querySelector('.zoom__title'); 
export const zoomImg = document.querySelector('.zoom__image'); 
export const formCard = document.querySelector('.form__card');
export const formEdit = document.querySelector('.form__edit');
export const formAvatarEdit = document.querySelector('.form__edit-avatar');
export const closeCard = document.querySelector('.popup__add-close');
export const closeEdit = document.querySelector('.popup__edit-close');
export const confirmationForm = document.querySelector('.confirmation__form');
export const editAvatarButton = document.querySelector('.profile__button_action_edit-avatar');