import { openPopupImg } from './index.js';

export default class Card {
  constructor(item, cardSelector, popupImage) {
    this._cardSelector = cardSelector;
    this._popupImage = popupImage;
    this._name = item.name;
    this._link = item.link;
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
  evt.stopPropagation();
}

  _setEventListeners() {
    this._element.querySelector('.element__button-like').addEventListener('click', (event) => {
			this._toggleLikeElement(event);
		});
    this._element.querySelector('.element__button-delete').addEventListener('click', (event) => {
			this._deleteElement(event);
		});
    this._element.addEventListener('click', (event) => {
			openPopupImg(this._link,this._name);
		});
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__description').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._setEventListeners();
   return this._element;
  }
}
