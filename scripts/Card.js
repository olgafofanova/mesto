export default class Card {
    //  constructor(item, cardSelector, openPopupImg) {
    constructor(item, cardSelector,handleCardClick) {
        this._cardSelector = cardSelector;
        this._name = item.name;
        this._link = item.link;
        this._handleCardClick = handleCardClick;
        //  this._openPopupImg = openPopupImg;
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

        // this._element.querySelector('.element__img').addEventListener('click', (event) => {
        //        this._openPopupImg(this._link, this._name);
        // });

        this._element.querySelector('.element__img').addEventListener('click', (event) => {
          console.log(this._handleCardClick);
         // this._handleCardClick(this._link, this._name);

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

// Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.
