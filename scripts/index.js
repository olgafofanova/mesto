import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, classSettingsValid } from './initial.js';

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

function addElements(element) { // добавление карточки к галерее elements
  const card = new Card(element, '.element_template');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened'); // открываем попап
  document.addEventListener('keydown', waitEscape);
}

export function openPopupImg(link, name) {
  popupImage.src = link;
  popupHeaderImg.textContent = name;
  openPopup(popupImg);
}

function hidePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
  document.removeEventListener('keydown', waitEscape);
  popupHeaderImg.textContent = '';
  popupImage.src = '';
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
  addElements(newItem);
  hidePopup(evt);

}

function waitEscape(evt) {
  if ((evt.key) === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened) {
      popupOpened.classList.remove('popup_opened');
    }
  }
}

const render = (initial) => {
  initial.forEach((item) => {
    addElements(item);
  });

}

render(initialCards);

const buttonStateInactive = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};


const Valid = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, obj);
    const formValidadion = formValidator.enableValidation();
  });
}

Valid(classSettingsValid);
