const closeButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
const addButton = document.querySelector('.profile__button_action_add');
const editButton = document.querySelector('.profile__button_action_edit');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const titleName = document.querySelector('.form__item_action_edit-title');
const linkName = document.querySelector('.form__item_action_edit-link');
const zoom = document.querySelector('.zoom');
const zoomContainer = zoom.querySelector('.zoom__container');
const zoomCloseButton = zoom.querySelector('.zoom__close-button');
const nameInput = document.querySelector('.form__item_action_edit-name');
const jobInput = document.querySelector('.form__item_action_edit-job');
const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__card')
// Карточки
const gallery = document.querySelector('.gallery');
const cardTemplate = gallery.querySelector('#card-template').content;
const initialCards = [
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

initialCards.forEach(item => {
    renderCard(item.name, item.link);
})

function renderCard(titleValue, imageValue){
    const cardElement = cardTemplate.cloneNode(true);
    const title = cardElement.querySelector('.gallery__item-title').textContent = titleValue;
    const cardPic = cardElement.querySelector('.gallery__item-image');
    cardPic.alt = titleValue;
    cardPic.src = imageValue;
    cardPic.addEventListener('click', () => {
            zoom.classList.toggle('popup__opened');
            const zoomTitle = document.querySelector('.zoom__title');
            zoomTitle.textContent = title;
            const zoomImg = document.querySelector('.zoom__image');
            zoomImg.setAttribute('src', imageValue);
            zoomImg.alt = titleValue;
    })
    const deleteButton = cardElement.querySelector('.gallery__delete-button');

    deleteButton.addEventListener('click', () => {
        deleteButton.parentElement.remove();
    })
    const likeButton = cardElement.querySelector('.gallery__like-button');
    likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('gallery__like-button_liked'); 
    })
    gallery.prepend(cardElement);  
}
// popupAdd.addEventListener('click', (evt) => {
//     evt.currentTarget.classList.remove("popup__opened")
// });
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        evt.target.classList.remove("popup__opened");
    })
})
popups.forEach((popup) => {
    popup.addEventListener('keypress', (evt) => {
        if(evt.key === "Escape" || evt.key === "Esc"){
            closePopup();
        }
    })
})



// popupAdd.addEventListener('click', (evt) => {
//     evt.currentTarget.classList.remove("popup__opened")
// });
nameInput.value = userName.textContent;
jobInput.value = userJob.textContent; 
function closePopup(){
    popups.forEach((evt) => {
        evt.classList.remove('popup__opened');
        
    })
}
 closeButtons.forEach((button) => {
     button.addEventListener('click', closePopup);
 })
 addButton.addEventListener('click', () => {
    popupAdd.classList.toggle('popup__opened');
 })
editButton.addEventListener('click', () => {
    popupEdit.classList.toggle('popup__opened');
});

// Находим форму в DOM
const formElement = document.querySelector('.form');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {

    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

const cardForm = document.querySelector('.form__card');
function cardSubmitHandler () {
    renderCard(titleName.value, linkName.value); 
    titleName.value = '';
    linkName.value = '';
    closePopup();
    
}
cardForm.addEventListener('submit', cardSubmitHandler);