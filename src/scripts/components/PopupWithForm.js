import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    //при закрытии попапа форма должна сбрасываться
    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }

    _setEventListeners() {
        super.setEventListeners();
        //добавение обработчика сабмита формы
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })
    }

    _getInputValues() { //собирает данные всех полей формы
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }
}