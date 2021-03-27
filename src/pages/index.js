//<link rel="stylesheet" href="./pages/index.css" />
import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import { initialCards, classSettingsValid } from '../scripts/initial.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

const config = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-21/cards',
    // url: 'https://mesto.nomoreparties.co/v1/cohort-21/users/me',
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
        // console.log(data);
        userInfo.setUserInfo(data);
        myId = userInfo.getUserId();
        // отрисовка карточек
        // cardsList.renderItems(data);
    })
    .catch(err => {
        console.log('Ошибка при загрузке карточек', err.message);
    });


function createCard(item) {
    const card = new Card(item, '.element_template', api, myId,
        (link, name) => {
            popupImg.open(link, name);
        }
    );
    return card.generateCard();
}

const cardsList = new Section({
        // items: data, //initialCards,
        items: {},
        renderer: (item) => {
            //console.log(item);
            const cardElement = createCard(item);
            cardsList.addItem(cardElement);
        },
        api,
    },
    '.elements'
);

api.getCards()
    .then(data => {
        // console.log(data);
        // отрисовка карточек
        cardsList.renderItems(data);
    })
    .catch(err => {
        console.log('Ошибка при загрузке карточек', err.message);
    });


//Для каждого попапа свой экземпляр класса PopupWithForm

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
const buttonAdd = document.querySelector(".profile__button-add");
const buttonSubmitAdd = document.querySelector('.popup_add').querySelector('.popup__button-submit');
buttonAdd.addEventListener('click', () => {
    popupAdd.open();
    formAddValidator.buttonStateInactive(buttonSubmitAdd, classSettingsValid.inactiveButtonClass);
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
//-----------------------------
// попап удаления карточки
const popupDelete = new PopupWithForm(
    '.popup_delete',
    '/cards',
    'POST',
    (_id) => {
        popupDelete.open(_id);
    },
    api
);
popupDelete.setEventListeners();

// const buttonSubmitAdd = document.querySelector('.popup_add').querySelector('.popup__button-submit');
// buttonAdd.addEventListener('click', () => {
//   popupAdd.open();
// });

//-----------------------------
// попап показа картинок
const popupImg = new PopupWithImage({},
    '.popup_type_image');
popupImg.setEventListeners();

const formElementAdd = document.querySelector('.popup_add').querySelector('.popup__form');
const formAddValidator = new FormValidator(formElementAdd, classSettingsValid); // включение валидации формы
formAddValidator.enableValidation();

const formElementProfile = document.querySelector('.popup_profile').querySelector('.popup__form');
const formProfileValidator = new FormValidator(formElementProfile, classSettingsValid); // включение валидации формы
formProfileValidator.enableValidation();
