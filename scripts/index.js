const initialCards = [
  {
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
const elements= document.querySelector(".elements");    //галерея
const buttonAdd = document.querySelector(".profile__button-add");
const buttonEdit = document.querySelector('.profile__button-edit'); // кнопка редактирования профиля
const popupAdd = document.querySelector('.popup_type_profile-add'); // попап профиля - добавления картинок
const popupImg = document.querySelector('.popup_type_image'); // попап добавления картинок
const closeButtons = document.querySelectorAll('.popup__button-close');
const popupHeader = popupAdd.querySelector('.popup__header');
const popupButton = popupAdd.querySelector ('.popup__form-button');
const formElement = popupAdd.querySelector('.popup__form');
const nameInput = popupAdd.querySelector('.popup__form-item_type_name');
const jobInput = popupAdd.querySelector('.popup__form-item_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupHeaderImg = popupImg.querySelector('.popup__header-img');
const popupImage = popupImg.querySelector('.popup__img');
//debugger;
closeButtons.forEach((button) => {
button.addEventListener('click', removePopup);
});

const popups = document.querySelectorAll('.popup');
popups.forEach((item) => {
  item.addEventListener('click', clickPopup);
});

buttonEdit.addEventListener('click', openEditPrifile);
buttonAdd.addEventListener('click', openAddElement);

function render() {
  initialCards.forEach(renderItem);
};

function renderItem (item) {  // построение карточки элемента
  const userElement = elementTemplate.cloneNode(true);		// клонируем содержимое тега template
  userElement.querySelector('.element__img').src = item.link;
  userElement.querySelector('.element__img').alt = item.name;
  userElement.querySelector('.element__description').textContent = item.name;
  userElement.querySelector('.element__button-like').addEventListener('click', toggleLikeElement);
  userElement.querySelector('.element__button-delete').addEventListener('click', deleteElement);
  userElement.querySelector('.element__img').addEventListener('click', openPopupImg);
  elements.prepend(userElement);
};


function addPopup() {
  popupAdd.classList.add('popup_opened'); // профиль, добавление места
}

function addPopupImg() {
  popupImg.classList.add('popup_opened'); //
}

function removePopup(evt) {
  if (evt.target === evt.currentTarget) {
    evt.target.closest('.popup').classList.remove('popup_opened');
    //popup.classList.remove('popup_opened');
  }
}

function clickPopup(evt) {
    if (evt.target === evt.currentTarget) {
      removePopup(evt);
    }
}

function openEditPrifile() {
  popupHeader.textContent='Редактировать профиль';
  popupButton.value='Сохранить';
  nameInput.placeholder = 'Жак Ив Кусто';
  jobInput.placeholder = 'Исследователь океана';
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  formElement.removeEventListener('submit', handleFormAddSubmit);
  formElement.addEventListener('submit', handleFormSubmit);
  addPopup();
}

function openAddElement() {
  popupHeader.textContent='Новое место';
  popupButton.value='Создать';
  nameInput.placeholder = 'Название';
  jobInput.placeholder = 'Ссылка на картинку';
  nameInput.value = '';
  jobInput.value = '';
  formElement.removeEventListener('submit', handleFormSubmit);
  formElement.addEventListener('submit', handleFormAddSubmit);
  addPopup();
}

function openPopupImg (evt) {
  popupHeaderImg.textContent=evt.target.alt;
  popupImage.src=evt.target.src;
  addPopupImg()
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    removePopup(evt);
}

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const newItem = {
      name: nameInput.value,
      link: jobInput.value
      }
    renderItem (newItem)
    removePopup(evt);
}

function toggleLikeElement(event) {
   if (event.target === event.currentTarget) {
    event.target.classList.toggle('element__button-like_active');
    }
}

function deleteElement(event) {
  if (event.target === event.currentTarget) {
   event.target.closest('.element').remove();
   }
}

render();
