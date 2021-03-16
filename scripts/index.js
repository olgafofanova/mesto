import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, classSettingsValid } from './initial.js';

import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// const elementTemplate = document.querySelector('.element_template').content; // шаблон
// const elements = document.querySelector('.elements'); //галерея
// const buttonAdd = document.querySelector(".profile__button-add");
// const buttonEdit = document.querySelector('.profile__button-edit'); // кнопка редактирования профиля

// const popupImg = document.querySelector('.popup_type_image'); // попап показа картинок
// popupImg.addEventListener('mousedown', clearPopupImg);

// const closeButtonImg = popupImg.querySelector('.popup__button-close');
// closeButtonImg.addEventListener('click', clearPopupImg);

// const closeButtons = document.querySelectorAll('.popup__button-close');
// closeButtons.forEach((button) => {
//     button.addEventListener('click', hidePopup);
// });

// const popupAdd = document.querySelector('.popup_add'); // попап профиля - добавления картинок
// const formElementAdd = popupAdd.querySelector('.popup__form');
// const formAddValidator = new FormValidator(formElementAdd, classSettingsValid); // включение валидации формы
// const formAddValidadion = formAddValidator.enableValidation();

// formElementAdd.addEventListener('submit', handleFormAddSubmit);
// const nameInputAdd = popupAdd.querySelector('.popup__input_type_name');
// const jobInputAdd = popupAdd.querySelector('.popup__input_type_description');
// const buttonSubmitAdd = popupAdd.querySelector('.popup__button-submit');

// const popupProfile = document.querySelector('.popup_profile'); // попап профиля - добавления картинок
// const formElementProfile = popupProfile.querySelector('.popup__form');
// const formProfileValidator = new FormValidator(formElementProfile, classSettingsValid); // включение валидации формы
// const formProfileValidadion = formProfileValidator.enableValidation();

// formElementProfile.addEventListener('submit', handleFormProfileSubmit);
// const nameInputProfile = popupProfile.querySelector('.popup__input_type_name');
// const jobInputProfile = popupProfile.querySelector('.popup__input_type_description');
// const buttonSubmitProfile = popupProfile.querySelector('.popup__button-submit');

// const profileName = document.querySelector('.profile__name');
// const profileDescription = document.querySelector('.profile__description');
// const popupHeaderImg = popupImg.querySelector('.popup__header-img');
// const popupImage = popupImg.querySelector('.popup__img');

// const popups = document.querySelectorAll('.popup');
// popups.forEach((item) => {
//     item.addEventListener('mousedown', clickPopup);
// });

// buttonEdit.addEventListener('click', openEditProfile);
// buttonAdd.addEventListener('click', openAddElement);

// function addElements(element) { // добавление карточки к галерее elements
//     const card = new Card(element, '.element_template', openPopupImg);
//     const cardElement = card.generateCard();
//     elements.prepend(cardElement);
// }

// function openPopup(popup) {
//     popup.classList.add('popup_opened'); // открываем попап
//     document.addEventListener('keydown', waitEscape);
// }

// export function openPopupImg(link, name) {
//     popupImage.src = link;
//     popupHeaderImg.textContent = name;
//     openPopup(popupImg);
// }

// function hidePopup(evt) {
//     evt.target.closest('.popup').classList.remove('popup_opened');
//     document.removeEventListener('keydown', waitEscape);
// }

// function clearPopupImg() {
//     popupHeaderImg.textContent = '';
//     popupImage.src = '';
// }

// function clickPopup(evt) {
//     if (evt.target === evt.currentTarget) {
//         hidePopup(evt);
//     }
// }

// function openEditProfile() {
//     nameInputProfile.value = profileName.textContent;
//     jobInputProfile.value = profileDescription.textContent;
//     openPopup(popupProfile);
// }

// function openAddElement() {
//     openPopup(popupAdd);
//     nameInputAdd.value = '';
//     jobInputAdd.value = '';
//     formAddValidator.buttonStateInactive(buttonSubmitAdd, classSettingsValid.inactiveButtonClass);
// }

// function handleFormProfileSubmit(evt) {
//     evt.preventDefault();
//     profileName.textContent = nameInputProfile.value;
//     profileDescription.textContent = jobInputProfile.value;
//     hidePopup(evt);
// }

// function handleFormAddSubmit(evt) {
//     evt.preventDefault();
//     const newItem = {
//         name: nameInputAdd.value,
//         link: jobInputAdd.value
//     }
//     addElements(newItem);
//     hidePopup(evt);
// }

// function waitEscape(evt) {
//     if ((evt.key) === 'Escape') {
//         const popupOpened = document.querySelector('.popup_opened');
//         if (popupOpened) {
//             popupOpened.classList.remove('popup_opened');
//         }
//     }
// }

// const render = (initial) => {
//     initial.forEach((item) => {
//         addElements(item);
//     });

// }

// render(initialCards);

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm

const cardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            //// добавление карточки к галерее elements
            //const card = new Card(item, '.element_template', openPopupImg);
            const card = new Card(item, '.element_template');
            const cardElement = card.generateCard();
            cardsList.addItem(cardElement);
        },
    },
    '.elements'
);

// отрисовка карточек
cardsList.renderItems();
