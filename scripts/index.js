const initialCards1 = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

const elementTemplate = document.querySelector(".element_template").content; // шаблон
const elements = document.querySelector(".elements"); //галерея
const buttonAdd = document.querySelector(".profile__button-add");
const buttonEdit = document.querySelector('.profile__button-edit'); // кнопка редактирования профиля

const popupImg = document.querySelector('.popup_type_image'); // попап показа картинок
const closeButtons = document.querySelectorAll('.popup__button-close');
closeButtons.forEach((button) => {
    button.addEventListener('click', hidePopup);
});

const popupAdd = document.querySelector('.popup_add'); // попап профиля - добавления картинок
const formElementAdd = popupAdd.querySelector('.popup__form');
formElementAdd.addEventListener('submit', handleFormAddSubmit);
const nameInputAdd = popupAdd.querySelector('.popup__input_type_name');
const jobInputAdd = popupAdd.querySelector('.popup__input_type_description');
const buttonSubmitAdd = popupAdd.querySelector('.popup__button-submit');

const popupProfile = document.querySelector('.popup_profile'); // попап профиля - добавления картинок
const formElementProfile = popupProfile.querySelector('.popup__form');
formElementProfile.addEventListener('submit', handleFormProfileSubmit);
const nameInputProfile = popupProfile.querySelector('.popup__input_type_name');
const jobInputProfile = popupProfile.querySelector('.popup__input_type_description');
const buttonSubmitProfile = popupProfile.querySelector('.popup__button-submit');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupHeaderImg = popupImg.querySelector('.popup__header-img');
const popupImage = popupImg.querySelector('.popup__img');

const popups = document.querySelectorAll('.popup');
popups.forEach((item) => {
    item.addEventListener('click', clickPopup);
});

buttonEdit.addEventListener('click', openEditProfile);
buttonAdd.addEventListener('click', openAddElement);

function render() {
    // initialCards.forEach((item) => {
    //     addElements(renderItem(item));
    // });


    initialCards1.forEach((item) => {
      const card = new Card(item, '.element_template');
      const cardElement = card.generateCard();
     // document.querySelector('.card-list__items').prepend(cardElement);
      elements.prepend(cardElement);
  });

}

function renderItem(item) { // построение карточки элемента
    const userElement = elementTemplate.cloneNode(true); // клонируем содержимое тега template
    const elementImg = userElement.querySelector('.element__img');
    elementImg.src = item.link;
    elementImg.alt = item.name;
    userElement.querySelector('.element__description').textContent = item.name;
    userElement.querySelector('.element__button-like').addEventListener('click', toggleLikeElement);
    userElement.querySelector('.element__button-delete').addEventListener('click', deleteElement);
    elementImg.addEventListener('click', openPopupImg);
    return userElement;
}

function addElements(elem) { // добавление карточки к галерее elements
    elements.prepend(elem);
}

function openPopup(popup) {
    popup.classList.add('popup_opened'); // открываем попап
    document.addEventListener('keydown', waitEscape);
}

function hidePopup(evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
    document.removeEventListener('keydown', waitEscape);
}

function clickPopup(evt) {
    if (evt.target === evt.currentTarget) {
        hidePopup(evt);
    }
}

function openEditProfile() {
    nameInputProfile.value = profileName.textContent;
    jobInputProfile.value = profileDescription.textContent;
    openPopup(popupProfile);
}

function openAddElement() {
    openPopup(popupAdd);
    nameInputAdd.value = '';
    jobInputAdd.value = '';
    buttonStateInactive(buttonSubmitAdd, classSettingsValid.inactiveButtonClass);
}

function openPopupImg(evt) {
    popupHeaderImg.textContent = evt.target.alt;
    popupImage.src = evt.target.src;
    openPopup(popupImg);
}

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputProfile.value;
    profileDescription.textContent = jobInputProfile.value;
    hidePopup(evt);
}

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const newItem = {
        name: nameInputAdd.value,
        link: jobInputAdd.value
    }
    addElements(renderItem(newItem));
    hidePopup(evt);
}

function toggleLikeElement(event) {
    event.target.classList.toggle('element__button-like_active');
}

function deleteElement(event) {
    event.target.closest('.element').remove();
}

function waitEscape(evt) {
    if ((evt.key) === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        if (popupOpened) {
            popupOpened.classList.remove('popup_opened');
        }
    }
}


class Card {
  constructor(item, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = item.name;
    this._link = item.link;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  _handleOpenPopup() {
    popupImage.src = this._image;
    popupElement.classList.add('popup_opened');
  }

  _handleClosePopup() {
    popupImage.src = '';
    popupElement.classList.remove('popup_opened');
  }

  _toggleLikeElement() {
    //event.target.classList.toggle('element__button-like_active');
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
}

_deleteElement() {
   // event.target.closest('.element').remove();
}


  _setEventListeners() {
   // this._element.addEventListener('click', () => {
    //   this._handleOpenPopup();
    // });

    // popupCloseButton.addEventListener('click', () => {
    //   this._handleClosePopup();
    // });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__description').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;


    // this._setEventListeners();
    // this._element.querySelector('.card__image').style.backgroundImage = `url(${this._image})`;
    // this._element.querySelector('.card__title').textContent = this._title;
    // this._element.querySelector('.card__info').textContent = this._description;
    // this._element.querySelector('.card__price-property').textContent = this._price;

    // this._element.querySelector('.card__image').style.backgroundImage = `url(${this._image})`;
    // this._element.querySelector('.card__title').textContent = this._title;



    // const elementImg = userElement.querySelector('.element__img');
    // elementImg.src = item.link;
    // elementImg.alt = item.name;
    // userElement.querySelector('.element__description').textContent = item.name;
    // userElement.querySelector('.element__button-like').addEventListener('click', toggleLikeElement);
    // userElement.querySelector('.element__button-delete').addEventListener('click', deleteElement);
    // elementImg.addEventListener('click', openPopupImg);



    return this._element;





  }

}





render();
