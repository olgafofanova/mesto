import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._title = data.title;
        this._image = data.image;
    }


    _getInputValues() { //собирает данные всех полей формы

    }

    setEventListeners() {}

    close() {}
}
