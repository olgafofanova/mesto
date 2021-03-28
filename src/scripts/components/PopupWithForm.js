import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, url, method, handleFormSubmit, api) {
        super(popupSelector, api);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._popupFormButton = this._popupForm.querySelector('.popup__button-submit');
        this._popupFormButtonCaption = this._popupForm.querySelector('.popup__button-submit').value;
        this._api = api;
        this._url = url;
        this._method = method;
    }

    //при закрытии попапа форма должна сбрасываться
    close() {
        super.close();
        this._popupForm.reset();
    }

    open() {
        this._popupFormButton.value = this._popupFormButtonCaption;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        //добавение обработчика сабмита формы
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._popupFormButton.value = 'Сохранение...';
            this._api.postInfo(this._url, this._method, this._getInputValues())
                .then(res => {
                    this._handleFormSubmit(res);
                })
                .catch(err => {
                    console.log('Ошибка при сохранении', err);
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
