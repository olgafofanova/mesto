import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, url, handleFormSubmit, api) {
        super(popupSelector, api);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._api = api;
        this._url = url;
    }

    //при закрытии попапа форма должна сбрасываться
    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        //добавение обработчика сабмита формы
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log(this._url);
           // debugger;
console.log(this._getInputValues());
console.log(this._getInputValues());
            // this._api.createCard(this._getInputValues())
            //   .then(res => {
            //    // this._addItem(res);
            //    this._handleFormSubmit(res);
            //    console.log(res);
            //    console.log(this._handleFormSubmit);
            //   })
            //   .catch(err => {
            //     console.log('Ошибка при создании карточки', err);
            //   });

            this._api.postInfo(this._url,this._getInputValues())
            .then(res => {
             // this._addItem(res);
             this._handleFormSubmit(res);
             console.log(res);
             console.log(this._handleFormSubmit);
            })
            .catch(err => {
              console.log('Ошибка при создании карточки', err);
            });

            this.close();
        })
    }

    _getInputValues() { //собирает данные всех полей формы
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }
}
