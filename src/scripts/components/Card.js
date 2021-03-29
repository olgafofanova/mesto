export default class Card {
    constructor(item, cardSelector, api, myId, handleCardClick, handleCardDelete) {
        //handleCardClick должна открывать попап с картинкой при клике на карточку.
        this._cardSelector = cardSelector;
        this._name = item.name;
        this._link = item.link;
        this._id = item._id;
        this._likes = item.likes.length;
        this._owner = item.owner._id;
        this.myId = myId;
        this._like = item.likes.some(function(like) {
          return like._id === myId;
      });
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._api = api;
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
        if (!this._like) {
            this._api.likeCard({ _id: this._id })
                .then(data => {
                    // изменить число лайков
                    this._likes += 1;
                    this._like = !this._like;
                    this._element.querySelector('.element__likeCount').textContent = this._likes;
                    this._element.querySelector('.element__button-like').classList.add('element__button-like_active');
                })
                .catch(err => {
                    console.log('Ошибка при установке лайка', err.message);
                });
        } else {
            this._api.likeCardDelete({ _id: this._id })
                .then(data => {
                    // изменить число лайков
                    if (this._likes > 0) { this._likes -= 1 };
                    this._like = !this._like;
                    this._element.querySelector('.element__likeCount').textContent = this._likes;
                    this._element.querySelector('.element__button-like').classList.remove('element__button-like_active');
                })
                .catch(err => {
                    console.log('Ошибка при удалении лайка', err.message);
                });
        }
        evt.stopPropagation();
    }

    _setEventListeners() {
        this._element.querySelector('.element__button-like').addEventListener('click', (event) => {
            this._toggleLikeElement(event);
        });

        this._element.querySelector('.element__button-delete').addEventListener('click', (event) => {
            this._handleCardDelete(this._id, this._element);
        });

        this._element.querySelector('.element__img').addEventListener('click', (event) => {
            this._handleCardClick(this._link, this._name)
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__description').textContent = this._name;
        this._element.querySelector('.element__likeCount').textContent = this._likes;
        const elementImg = this._element.querySelector('.element__img');

        if (this._like) {
            this._element.querySelector('.element__button-like').classList.add('element__button-like_active');
        };

        if (!(this._owner === this.myId)) {
            this._element.querySelector('.element__button-delete').classList.add('element__button-delete_none');
        };

        elementImg.src = this._link;
        elementImg.alt = this._name;
        this._setEventListeners();
        return this._element;
    }
}
