let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button_action_edit')
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__job');

let nameInput = document.querySelector('.form__item_action_edit-name');
let jobInput = document.querySelector('.form__item_action_edit-job');
nameInput.value = userName.textContent;
jobInput.value = userJob.textContent; 
function closePopup(){
    popup.classList.remove('popup__opened');
}
function openPopup(){
    popup.classList.add('popup__opened');
}

closeButton.addEventListener('click', closePopup); // Две фунцции, которые говорят за открытие и закрытие.
editButton.addEventListener('click', openPopup);

// Находим форму в DOM
let formElement = document.querySelector('.form');
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
