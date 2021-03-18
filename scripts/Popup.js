export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', (event) => {
        this._handleEscClose(event);
      });
    }

    close() {
      this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        //содержит логику закрытия попапа клавишей Esc.
        if ((evt.key) === 'Escape') {
          this.close()
              }
    }

    setEventListeners() {
        // добавляет слушателя клика иконке закрытия попапа
        this._popup.querySelector('.popup__button-close').addEventListener('click', (event) => {
          this.close();
        });

        // закрытие попапа при клике на попапе мимо картинки
        this._popup.addEventListener('mousedown', (event) => {
          if (event.target === event.currentTarget) {
            this.close();
                 }
        });
    }
}
