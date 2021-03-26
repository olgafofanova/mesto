export default class Card {
    constructor(item, cardSelector, handleCardClick) {
        //handleCardClick должна открывать попап с картинкой при клике на карточку.
        this._cardSelector = cardSelector;
        this._name = item.name;
        this._link = item.link;
        this._id = item._id;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _toggleLikeElement(evt) {
        this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
        evt.stopPropagation();
    }

    _deleteElement(evt) {
        this._element.remove();
        this._element = null;
        evt.stopPropagation();
    }

    _setEventListeners() {
        this._element.querySelector('.element__button-like').addEventListener('click', (event) => {
            this._toggleLikeElement(event);
        });
        this._element.querySelector('.element__button-delete').addEventListener('click', (event) => {
            this._deleteElement(event);
        });

        this._element.querySelector('.element__img').addEventListener('click', (event) => {
            this._handleCardClick(this._link, this._name)
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__description').textContent = this._name;
        const elementImg = this._element.querySelector('.element__img');
        elementImg.src = this._link;
        elementImg.alt = this._name;
        this._setEventListeners();
        return this._element;
    }
}
