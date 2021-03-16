import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._title = data.title;
        this._image = data.image;
    }


    open() {

    }
}
