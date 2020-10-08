import {forms} from './index.js';
const selectors = {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled_true',
    inputErrorClass: 'form__item_invalid',
    errorClass: 'form__input-error_active_true',
}

class FormValidator { 
        constructor(selectors, formElement){
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
        this._formElement = formElement;
    }
    _showInputError (formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._errorClass}`);
    }
    _hideInputError (formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(`${this._errorClass}`);
    }
    _setEventListeners (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(`${this._inputSelector}`));
        const buttonElement = formElement.querySelector(`${this._submitButtonSelector}`);
        this._handleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(formElement, inputElement);
                this._handleButtonState(inputList, buttonElement);
            });
        });
    };
    
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid);
      };
    
    _handleButtonState  (inputList, buttonElement) {
        if(this._hasInvalidInput(inputList)){
            this._makeButtonInactive(buttonElement);
        } else {
            this._makeButtonActive(buttonElement);
        }
    }
    
    _makeButtonActive (buttonElement) {
        buttonElement.classList.remove(`${this._inactiveButtonClass}`); 
        buttonElement.removeAttribute('disabled', true);
    }
    
    _makeButtonInactive (buttonElement) {
        buttonElement.classList.add(`${this._inactiveButtonClass}`);  
        buttonElement.setAttribute('disabled', true);
    }
    
    _checkInputValidity (formElement, inputElement){
        const isInputNotValid = !inputElement.validity.valid;
        if(isInputNotValid){
            let errorMessage = inputElement.validationMessage;
            inputElement.classList.add(`${this._inputErrorClass}`);
            this._showInputError(formElement, inputElement, errorMessage);
        } else{
            inputElement.classList.remove(`${this._inputErrorClass}`);
            this._hideInputError(formElement, inputElement);
        }
    }
    enableValidation (formElement) {
        formElement.addEventListener("submit", (evt) => {
                evt.preventDefault();
            })
            this._setEventListeners(formElement);
    }
    _test (selectors, formElement) {
        console.log(selectors, formElement);
    }
}
forms.forEach((form) => {
    const formValidation = new FormValidator(selectors, form);
    formValidation.enableValidation(form);
})