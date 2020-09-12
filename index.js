const closeButton = document.querySelectorAll('.popup__close-button');
const popup = document.querySelectorAll('.popup');
const addButton = document.querySelector('.profile__button_action_add');
const editButton = document.querySelector('.profile__button_action_edit');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const titleName = document.querySelector('.form__item_action_edit-title');
const linkName = document.querySelector('.form__item_action_edit-link');
const zoom = document.querySelector('.zoom');
const zoomContainer = document.querySelector('.zoom__container');
const zoomCloseButton = document.querySelector('.zoom__close-button');

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

render();

function renderCard(titleValue, imageValue){
    const cardElement = cardTemplate.cloneNode(true);
    const title = cardElement.querySelector('.gallery__item-title').textContent = titleValue;
    const cardPic = cardElement.querySelector('.gallery__item-image');
    cardPic.setAttribute("src", imageValue);
    cardPic.addEventListener('click', () => {
            zoom.classList.toggle('popup__opened');
            const zoomTitle = document.querySelector('.zoom__title');
            zoomTitle.textContent = title;
            const zoomImg = document.querySelector('.zoom__image');
            zoomImg.setAttribute('src', imageValue);
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
 //   cardElement.querySelectorAll('gallery__like-button').forEach((btn) => {
    //    btn.addEventListener('click', alert('hello'));
   //  }) // Нужно добавить систему индексов !!! 

function render(){
 
    initialCards.forEach(item => {
        renderCard(item.name, item.link);
    })
    
}

let nameInput = document.querySelector('.form__item_action_edit-name');
let jobInput = document.querySelector('.form__item_action_edit-job');
nameInput.value = userName.textContent;
jobInput.value = userJob.textContent; 
function closePopup(){
    // popup[0].classList.remove('popup__opened');
    popup.forEach((evt) => {
        evt.classList.remove('popup__opened');
        
    })
}
function openPopup(){
    popup[0].classList.add('popup__opened');
}

 // closeButton.addEventListener('click', closePopup); // Две фунцции, которые говорят за открытие и закрытие.
 closeButton.forEach((evt) => {
     evt.addEventListener('click', closePopup);
 })
 addButton.addEventListener('click', (evt) => {
     popup[1].classList.add('popup__opened');
 })
editButton.addEventListener('click', openPopup);

// Находим форму в DOM
const formElement = document.querySelector('.form');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
    // Получите значение полей из свойства value
    // Вставьте новые значения с помощью textContent
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

const cardHandler = document.querySelector('.form__card');
function cardSubmitHandler (evt) {
    evt.preventDefault();
    renderCard(titleName.value, linkName.value); 
    titleName.value = '';
    linkName.value = '';
    closePopup();
    
}
cardHandler.addEventListener('submit', cardSubmitHandler);