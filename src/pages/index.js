//<link rel="stylesheet" href="./pages/index.css" />
import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import { initialCards, classSettingsValid } from '../scripts/initial.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';


function createCard(item) {
    const card = new Card(item, '.element_template',
        (link, name) => {
            popupImg.open(link, name);
        }
    );
    return card.generateCard();
}

const cardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            const cardElement = createCard(item);
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
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
    }
);
popupAdd.setEventListeners();

const buttonAdd = document.querySelector(".profile__button-add"); // кнопка добавления картинки
const buttonSubmitAdd = document.querySelector('.popup_add').querySelector('.popup__button-submit');
buttonAdd.addEventListener('click', () => {
    popupAdd.open();
    formAddValidator.buttonStateInactive(buttonSubmitAdd, classSettingsValid.inactiveButtonClass);
});

// попап профиля
const popupProfile = new PopupWithForm(
    '.popup_profile',
    (item) => {
        userInfo.setUserInfo(item);
    }
);
popupProfile.setEventListeners();

const buttonEdit = document.querySelector('.profile__button-edit'); // кнопка редактирования профиля
const buttonEditInputName = document.querySelector('.popup_profile').querySelector('.popup__input_type_name'); // поле редактирования имени
const buttonEditInputDescription = document.querySelector('.popup_profile').querySelector('.popup__input_type_description'); // поле редактирования описания

buttonEdit.addEventListener('click', (event) => {
    popupProfile.open(event);
    const usinfo = userInfo.getUserInfo();
    buttonEditInputName.value = usinfo.name;
    buttonEditInputDescription.value = usinfo.description;
});

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
