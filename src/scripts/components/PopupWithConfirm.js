import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, url, method, handleFormSubmit, api) {
        super(popupSelector, api);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');

        this._api = api;
        this._url = url;
        this._method = method;
    }

    open(id, element) {
        super.open();
        this._idCard = id;
        this._elementCard = element;
        console.log(this._idCard);
    }

    setEventListeners() {
        super.setEventListeners();

        //добавение обработчика сабмита формы
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._api.deleteCard({ _id: this._idCard })
                .then(res => {
                    this._elementCard.remove();
                    this._elementCard = null;
                })
                .catch(err => {
                    console.log('Ошибка при удалении карточки', err);
                });
            this.close();
        })
    }
}
