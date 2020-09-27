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
const popupOpened = document.querySelector('.popup__opened');
const formElement = document.querySelector('.form');
const cardForm = document.querySelector('.form__card');
const cardSubmit = document.querySelector('#card-submit');
// const openButtons = document.querySelectorAll('.popup__open');
// Карточки
const gallery = document.querySelector('.gallery');
const cardTemplate = gallery.querySelector('#card-template').content;
initialCards.forEach(item => {
    const cardElement = renderCard(item.name, item.link);
    gallery.prepend(cardElement);
})
function handleZoom (titleValue, imageValue) {
    openPopup(zoom);
    zoomTitle.textContent = titleValue; 
    zoomImg.setAttribute('src', imageValue); 
    zoomImg.alt = titleValue; 
}
function deleteParent (button) {
    button.parentElement.remove();
}
function like (button) {
    button.classList.toggle('gallery__like-button_liked');
}
function renderCard(titleValue, imageValue){ 
    const cardElement = cardTemplate.cloneNode(true); 
    const title = cardElement.querySelector('.gallery__item-title').textContent = titleValue; 
    const cardPic = cardElement.querySelector('.gallery__item-image'); 
    cardPic.alt = titleValue; 
    cardPic.src = imageValue; 

    cardPic.addEventListener('click', () => { 
            handleZoom(titleValue, imageValue);
    }) 
    const deleteButton = cardElement.querySelector('.gallery__delete-button');

    deleteButton.addEventListener('click', () => {
        deleteParent(deleteButton);
    })
    const likeButton = cardElement.querySelector('.gallery__like-button');
    likeButton.addEventListener('click', () => {
        like(likeButton);
    });
    return cardElement;
}
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        evt.target.classList.remove("popup__opened");
    })
});
// document.addEventListener('keydown', (evt) => {
//     if(evt.key === 'Escape') {
//     popups.forEach((popup) => {
//         popup.classList.remove('popup__opened')
//     })}
// })

// popupAdd.addEventListener('click', (evt) => {
//     evt.currentTarget.classList.remove("popup__opened")
// });
function closePopup(){
    popups.forEach((evt) => {
        evt.classList.remove('popup__opened');  
    })
    document.removeEventListener('keydown', closeEsc);
}
 closeButtons.forEach((button) => {
     button.addEventListener('click', closePopup);
})
function openPopup(popup) {
    popup.classList.add('popup__opened');
}
function closeEsc (evt){
    if(evt.key === 'Escape') {
        closePopup();
    }
}
function openPopup (popup) {
    popup.classList.add('popup__opened');
    document.addEventListener('keydown', closeEsc);
}
const makeButtonInactive = (buttonElement) => {
    buttonElement.classList.add("form__submit-button_disabled_true");
    buttonElement.setAttribute('disabled', true);
}
addButton.addEventListener('click', () => {
    openPopup(popupAdd);
 })
editButton.addEventListener('click', () => {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent; 
    openPopup(popupEdit);
});
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitFormHandler (evt) {

    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', submitFormHandler);
function submitCardHandler () {
    const cardElement = renderCard(titleName.value, linkName.value);
    gallery.prepend(cardElement); 
    titleName.value = '';
    linkName.value = '';
    closePopup();
    makeButtonInactive(cardSubmit);
}
cardForm.addEventListener('submit', submitCardHandler);