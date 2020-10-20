export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
    }
    open(){
        this._popup.classList.add('popup__opened');
        document.addEventListener("keydown", this._handleEscClose);
    }
    close(){
        this._popup.classList.remove('popup__opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
          this.close();
        }
      };
    setEventListeners(){
        const closeButton = this._popup.querySelector('.popup__close-button');
        closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup__opened')){
                this.close();
            } 
        })
    }
}



        // openButton.addEventListener('click', () => {
        //     this.open();
        // })
        // closeButton.addEventListener('click', () => {
        //     this.close();
        // })
        // this._popup.addEventListener('click', (evt) => {
        //     if(evt.target.classList.contains('popup__opened')){
        //         this.close();
        //     }
        // })