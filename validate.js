const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active_true');
}
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove('form__input-error_active_true');
}
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__item'));
    const buttonElement = formElement.querySelector('.form__submit-button');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement);
            buttonState(inputList, buttonElement);
        });
    });
    buttonState(inputList, buttonElement);
};const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };
const buttonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add("form__submit-button_disabled_true");
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('form__submit-button_disabled_true');
        buttonElement.removeAttribute('disabled', true);
    }
}
// const hasInvalidInput = (formElement) => {
//     const inputList = Array.from(formElement.querySelectorAll('.form__item'));
//     return inputList.some((inputElement) => {
//         console.log(!inputElement.validity.valid);
//         return !inputElement.validity.valid;
//     })
// }
// hasInvalidInput(popupAdd);
// const submitButtonState = (formElement) => {
//     const buttonElement = formElement.querySelector('.form__submit-button');
//     if(hasInvalidInput(formElement)){
//         buttonElement.classList.add('form__submit-button_disabled_true');
//     } else {
//         buttonElement.classList.remove('form__submit-button_disabled_true');
//     }
// }
const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    if(isInputNotValid){
        let errorMessage = inputElement.validationMessage;
        inputElement.classList.add("form__item_invalid");
        showInputError(formElement, inputElement, errorMessage);
    } else{
        inputElement.classList.remove('form__item_invalid');
        hideInputError(formElement, inputElement); // Много ошибок в консоли по-моему выдаёт эта линия
    }
}
const enableValidation = (formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const formList = Array.from(document.querySelectorAll('.popup'));
    formList.forEach((form) => {
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })
    })
    setEventListeners(formSelector)
}
// Сдлеать кнопку, разобраться с  обьектом.
enableValidation(popupEdit);
enableValidation(popupAdd);
// enableValidation({
//     formSelector: '.popup',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled', // Свои классы написать
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   }); 