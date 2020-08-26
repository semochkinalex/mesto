let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button_action_edit')
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__job');

let nameInput = document.querySelector('.form__item_action_edit-name');
let jobInput = document.querySelector('.form__item_action_edit-job');
nameInput.setAttribute('placeholder', userName.textContent);
jobInput.setAttribute('placeholder', userJob.textContent);
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

    // Находим поля формы в DOM
    let nameInput = document.querySelector('.form__item_action_edit-name');
    let jobInput = document.querySelector('.form__item_action_edit-job');
    // Получите значение полей из свойства value
    nameInput = nameInput.value;
    jobInput = jobInput.value;
    // Вставьте новые значения с помощью textContent
    userName.textContent = nameInput;
    userJob.textContent = jobInput;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', closePopup);