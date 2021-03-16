export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', waitEscape);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
    }

    _handleEscClose() {
        //содержит логику закрытия попапа клавишей Esc.
        document.removeEventListener('keydown', waitEscape);
        //     document.addEventListener('keydown', waitEscape);
    }

    setEventListeners() {
        // обавляет слушатель клика иконке закрытия попапа
        // this._element.querySelector('.element__button-delete').addEventListener('click', (event) => {
        //   this._deleteElement(event);
        // });
    }
}
