export {validate};
const selectors = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled_true',
    inputErrorClass: 'form__item_invalid',
    errorClass: 'form__input-error_active_true' //  Точки убраны у селекторов которые передаются в случае аргумента для classList
}

class FormValidator {
    constructor(selectors){
        this._inputSelector = selectors.inputSelector;
        this._formSelector = selectors.formSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
    }
    _showInputError (formElement, inputElement, errorMessage, errorSelector) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${errorSelector}`);
    }
    _hideInputError (formElement, inputElement, errorSelector) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(`${errorSelector}`);
    }
    _setEventListeners (formElement, inputSelector, buttonSelector, inactiveButtonSelector, inputErrorSelector, errorSelector) {
        const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
        const buttonElement = formElement.querySelector(`${buttonSelector}`);
        this._handleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(formElement, inputElement, inputErrorSelector, errorSelector);
                this._handleButtonState(inputList, buttonElement, inactiveButtonSelector);
            });
        });
    };
    
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid);
      };
    
    _handleButtonState  (inputList, buttonElement, inactiveButtonSelector) {
        if(this._hasInvalidInput(inputList)){
            this._makeButtonInactive(buttonElement, inactiveButtonSelector);
        } else {
            this._makeButtonActive(buttonElement, inactiveButtonSelector);
        }
    }
    
    _makeButtonActive (buttonElement, inactiveButtonSelector) {
        buttonElement.classList.remove(`${inactiveButtonSelector}`);
        buttonElement.removeAttribute('disabled', true);
    }
    
    _makeButtonInactive (buttonElement) {
        buttonElement.classList.add("form__submit-button_disabled_true");
        buttonElement.setAttribute('disabled', true);
    }
    
    _checkInputValidity (formElement, inputElement, inputErrorSelector, errorSelector){
        const isInputNotValid = !inputElement.validity.valid;
        if(isInputNotValid){
            let errorMessage = inputElement.validationMessage;
            inputElement.classList.add(`${inputErrorSelector}`);
            this._showInputError(formElement, inputElement, errorMessage, errorSelector);
        } else{
            inputElement.classList.remove(`${inputErrorSelector}`);
            this._hideInputError(formElement, inputElement, errorSelector); // Много ошибок в консоли по-моему выдаёт эта линия
        }
    }
    enableValidation (selectors) {
        const formList = Array.from(document.querySelectorAll(`${selectors.formSelector}`));
        formList.forEach((form) => {
            form.addEventListener("submit", (evt) => {
                evt.preventDefault();
            })
        })
        formList.forEach((formElement) => {
            this._setEventListeners(formElement, selectors.inputSelector, selectors.submitButtonSelector, selectors.inactiveButtonClass, selectors.inputErrorClass, selectors.errorClass); // какая-та дичь полнейшая
        })
    }
}
const validate = new FormValidator(selectors);
validate.enableValidation(selectors);
// const showInputError = (formElement, inputElement, errorMessage, errorSelector) => {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(`${errorSelector}`);
// }
// const hideInputError = (formElement, inputElement, errorSelector) => {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     errorElement.textContent = '';
//     errorElement.classList.remove(`${errorSelector}`);
// }
// const setEventListeners = (formElement, inputSelector, buttonSelector, inactiveButtonSelector, inputErrorSelector, errorSelector) => {
//     const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
//     const buttonElement = formElement.querySelector(`${buttonSelector}`);
//     handleButtonState(inputList, buttonElement);
//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener("input", () => {
//             checkInputValidity(formElement, inputElement, inputErrorSelector, errorSelector);
//             handleButtonState(inputList, buttonElement, inactiveButtonSelector);
//         });
//     });
// };

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => !inputElement.validity.valid);
//   };

// const handleButtonState = (inputList, buttonElement, inactiveButtonSelector) => {
//     if(hasInvalidInput(inputList)){
//         makeButtonInactive(buttonElement, inactiveButtonSelector);
//     } else {
//         makeButtonActive(buttonElement, inactiveButtonSelector);
//     }
// }

// const makeButtonActive = (buttonElement, inactiveButtonSelector) => {
//     buttonElement.classList.remove(`${inactiveButtonSelector}`);
//     buttonElement.removeAttribute('disabled', true);
// }

// const makeButtonInactive = (buttonElement) => {
//     buttonElement.classList.add("form__submit-button_disabled_true");
//     buttonElement.setAttribute('disabled', true);
// }

// const checkInputValidity = (formElement, inputElement, inputErrorSelector, errorSelector) => {
//     const isInputNotValid = !inputElement.validity.valid;
//     if(isInputNotValid){
//         let errorMessage = inputElement.validationMessage;
//         inputElement.classList.add(`${inputErrorSelector}`);
//         showInputError(formElement, inputElement, errorMessage, errorSelector);
//     } else{
//         inputElement.classList.remove(`${inputErrorSelector}`);
//         hideInputError(formElement, inputElement, errorSelector); // Много ошибок в консоли по-моему выдаёт эта линия
//     }
// }
// const enableValidation = (selectors) => {
//     const formList = Array.from(document.querySelectorAll(`${selectors.formSelector}`));
//     formList.forEach((form) => {
//         form.addEventListener("submit", (evt) => {
//             evt.preventDefault();
//         })
//     })
//     formList.forEach((formElement) => {
//         setEventListeners(formElement, selectors.inputSelector, selectors.submitButtonSelector, selectors.inactiveButtonClass, selectors.inputErrorClass, selectors.errorClass); // какая-та дичь полнейшая
//     })
// }
// Сдлеать кнопку, разобраться с  обьектом.
// enableValidation({formSelector: '.popup'});

// formSelector: '.form',
// inputSelector: '.form__item',
// submitButtonSelector: 'form__submit-button',
// inactiveButtonClass: 'form__submit-button_disabled_true', 
// inputErrorClass: 'form__item_invalid',
// errorClass: 'form__input-error_active_true'