import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, classSettingsValid } from './initial.js';

import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const buttonAdd = document.querySelector(".profile__button-add"); // кнопка добавления картинки
const buttonEdit = document.querySelector('.profile__button-edit'); // кнопка редактирования профиля

const cardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            //// добавление карточки к галерее elements
            const card = new Card(item, '.element_template',
                (link, name) => {
                    popupImg.open(link, name);
                }
            );
            const cardElement = card.generateCard();
            cardsList.addItem(cardElement);
        },
    },
    '.elements'
);

// отрисовка карточек
cardsList.renderItems();

const userInfo = new UserInfo('.profile__name', '.profile__description');

//Для каждого попапа свой экземпляр класса PopupWithForm
// попап добавления картинок
const popupAdd = new PopupWithForm(
    '.popup_add',
    (item) => {
        const card = new Card(item, '.element_template',
            (link, name) => {
                popupImg.open(link, name);
            }
        );
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    }
);
popupAdd._setEventListeners();
buttonAdd.addEventListener('click', popupAdd.open.bind(popupAdd));

// попап профиля
const popupProfile = new PopupWithForm(
    '.popup_profile',
    (item) => {
        userInfo.setUserInfo(item);
    }
);
popupProfile._setEventListeners();


buttonEdit.addEventListener('click', (event) => {
    popupProfile.open.bind(popupProfile)(event);
    const usinfo = userInfo.getUserInfo.bind(userInfo)();
    popupProfile._popup.querySelector('.popup__input_type_name').value = usinfo.name;
    popupProfile._popup.querySelector('.popup__input_type_description').value = usinfo.description;

});

// попап показа картинок
const popupImg = new PopupWithImage({},
    '.popup_type_image');
popupImg.setEventListeners();

const formElementAdd = document.querySelector('.popup_add').querySelector('.popup__form');
const formAddValidator = new FormValidator(formElementAdd, classSettingsValid); // включение валидации формы
const formAddValidadion = formAddValidator.enableValidation();

const formElementProfile = document.querySelector('.popup_profile').querySelector('.popup__form');
const formProfileValidator = new FormValidator(formElementProfile, classSettingsValid); // включение валидации формы
const formProfileValidadion = formProfileValidator.enableValidation();