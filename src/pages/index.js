//<link rel="stylesheet" href="./pages/index.css" />
import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import { initialCards, classSettingsValid } from '../scripts/initial.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: '8ea55ead-cf60-403a-aee5-af8dfdc70d5b',
        'Content-Type': 'application/json',

    },
};


const api = new Api(config);

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
let myId;

api.getUser()
    .then(data => {
        userInfo.setUserInfo(data);
        myId = userInfo.getUserId();
    })
    .catch(err => {
        console.log('Ошибка при загрузке карточек', err.message);
    });


function createCard(item) {
    const card = new Card(item, '.element_template', api, myId,
        (link, name) => {
            popupImg.open(link, name);
        },
        (id, element) => {
            popupDelete.open(id, element);
        }
    );
    return card.generateCard();
}

const cardsList = new Section({
        items: {},
        renderer: (item) => {
            const cardElement = createCard(item);
            cardsList.addItem(cardElement);
        },
        api,
    },
    '.elements'
);

api.getCards()
    .then(data => {
        // отрисовка карточек
        cardsList.renderItems(data);
    })
    .catch(err => {
        console.log('Ошибка при загрузке карточек', err.message);
    });

// попап добавления картинок
const popupAdd = new PopupWithForm(
    '.popup_add',
    '/cards',
    'POST',
    (item) => {
        const cardElement = createCard(item);
        cardsList.addNewItem(cardElement);
    },
    api
);
popupAdd.setEventListeners();

// кнопка добавления картинки
const formElementAdd = document.querySelector('.popup_add').querySelector('.popup__form');
const formAddValidator = new FormValidator(formElementAdd, classSettingsValid); // включение валидации формы
formAddValidator.enableValidation();

const buttonAdd = document.querySelector(".profile__button-add");
//const buttonSubmitAdd = document.querySelector('.popup_add').querySelector('.popup__button-submit');
buttonAdd.addEventListener('click', () => {
    popupAdd.open();
   // formAddValidator.buttonStateInactive(buttonSubmitAdd, classSettingsValid.inactiveButtonClass);
    formAddValidator.buttonStateInactive(classSettingsValid.inactiveButtonClass);
});

// попап профиля
const popupProfile = new PopupWithForm(
    '.popup_profile',
    '/users/me',
    'PATCH',
    (item) => {
        userInfo.setUserInfo(item);
    },
    api
);
popupProfile.setEventListeners();

const buttonEdit = document.querySelector('.profile__button-edit'); // кнопка редактирования профиля
const buttonEditInputName = document.querySelector('.popup_profile').querySelector('.popup__input_type_name'); // поле редактирования имени
const buttonEditInputDescription = document.querySelector('.popup_profile').querySelector('.popup__input_type_description'); // поле редактирования описания

buttonEdit.addEventListener('click', (event) => {
    popupProfile.open(event);
    const usinfo = userInfo.getUserInfo();
    buttonEditInputName.value = usinfo.name;
    buttonEditInputDescription.value = usinfo.about;
});
//---------------------------
// попап редактирования аватара
const popupEditAvatar = new PopupWithForm(
    '.popup_avatar',
    '/users/me/avatar',
    'PATCH',
    (item) => {
        userInfo.setUserInfo(item);
    },
    api
);
popupEditAvatar.setEventListeners();

const iconAvatarEdit = document.querySelector('.profile__avatar'); // кнопка редактирования профиля

iconAvatarEdit.addEventListener('click', (event) => {
    popupEditAvatar.open(event);
    // const usinfo = userInfo.getUserInfo();
    // buttonEditInputName.value = usinfo.name;
    // buttonEditInputDescription.value = usinfo.about;
});


//-----------------------------
// попап удаления карточки
const popupDelete = new PopupWithConfirm(
    '.popup_delete',
    '/cards',
    'DELETE',
    //функция удаления карточки
    (_id) => {
        popupDelete.open(_id);
    },
    api
);
popupDelete.setEventListeners();

//-----------------------------
// попап показа картинок
const popupImg = new PopupWithImage({},
    '.popup_type_image');
popupImg.setEventListeners();

const formElementProfile = document.querySelector('.popup_profile').querySelector('.popup__form');
const formProfileValidator = new FormValidator(formElementProfile, classSettingsValid); // включение валидации формы
formProfileValidator.enableValidation();

const formElementProfileAvatar = document.querySelector('.popup_avatar').querySelector('.popup__form'); // форма смены аватара
const formProfileAvatarValidator = new FormValidator(formElementProfileAvatar, classSettingsValid); // создание класса валидации формы
formProfileAvatarValidator.enableValidation();  // включение валидации формы
