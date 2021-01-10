let ButtonEdit = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let CloseButton = popup.querySelector('.popup__button-close');

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

function clickPopup(event) {
    if (event.target === event.currentTarget) {
        togglePopup();
    }
}

ButtonEdit.addEventListener('click', togglePopup);
CloseButton.addEventListener('click', togglePopup);
popup.addEventListener('click', clickPopup);

let formElement = popup.querySelector('.popup__form');

function handleFormSubmit(evt) {
    evt.preventDefault();

    let nameInput = popup.querySelector('.popup__form-name');
    let jobInput = popup.querySelector('.popup__form-description');

    let profileName = document.querySelector('.profile__name');
    let profileDescription = document.querySelector('.profile__description');

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    togglePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
