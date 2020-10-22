export default class FormValidator { 
        constructor(selectors, formElement){
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }
    _showInputError (inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._errorClass}`);
    }
    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(`${this._errorClass}`);
    }
    _setEventListeners () {
        this._handleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._handleButtonState();
            });
        });
    };
    _hasInvalidInput () {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
      };
    
    _handleButtonState  () {
        if(this._hasInvalidInput()){
            this._makeButtonInactive();
        } else {
            this._makeButtonActive();
        }
    }
    
    _makeButtonActive () {
        this._buttonElement.classList.remove(`${this._inactiveButtonClass}`); 
        this._buttonElement.removeAttribute('disabled', true);
    }
    
    _makeButtonInactive () {
        this._buttonElement.classList.add(`${this._inactiveButtonClass}`);  
        this._buttonElement.setAttribute('disabled', true);
    }
    
    _checkInputValidity (inputElement){
        const isInputNotValid = !inputElement.validity.valid;
        if(isInputNotValid){
            let errorMessage = inputElement.validationMessage;
            inputElement.classList.add(`${this._inputErrorClass}`);
            this._showInputError(inputElement, errorMessage);
        } else{
            inputElement.classList.remove(`${this._inputErrorClass}`);
            this._hideInputError(inputElement);
        }
    }
    cleanErrors () {
        this._makeButtonInactive();
        this._inputList.forEach((inputElement) => { 
            this._hideInputError(inputElement)
          });
    }
    enableValidation () {
    this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
    })
    this._setEventListeners();
    }
}
