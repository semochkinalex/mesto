import PopupWithForm from './PopupWithForm.js';
export default class PopupCard extends PopupWithForm {
    close() {  // Сделано намеренно. Правильность этого поступка решит код-ревью :D
        super.close();
        const inputs = super._getInputValues();
        inputs.forEach((input) => {
            input.value = '';
        })
    }
}