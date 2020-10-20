export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._popupSelector = popupSelector;
    }
    open(){
        this._popup.classList.add('popup__opened');
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }
    close(){
        this._popup.classList.remove('popup__opened');
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }
    _handleEscClose(evt){
        if(evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners(btn, closeBtn){
        btn.addEventListener('click', () => {
            this.open();
        })
        closeBtn.addEventListener('click', () => {
            this.close();
        })
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup__opened')){
                this.close();
            }
        })
    }
}
