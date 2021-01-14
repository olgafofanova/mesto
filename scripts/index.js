let buttonEdit = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__button-close');

// function togglePopup() {
//     popup.classList.toggle('popup_opened');
// }

function addPopup() {
  popup.classList.add('popup_opened');
}

function removePopup() {
  popup.classList.remove('popup_opened');
}

function clickPopup(event) {
    if (event.target === event.currentTarget) {
      removePopup();
    }
}

buttonEdit.addEventListener('click', openEditPrifile);
closeButton.addEventListener('click', removePopup);
popup.addEventListener('click', clickPopup);

let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__form-item_type_name');
let jobInput = popup.querySelector('.popup__form-item_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openEditPrifile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  addPopup();
}


function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    removePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
