export default class FormValidator {
  constructor(formElement, SettingsValid) {
    this._formSelector = SettingsValid.formSelector;
    this._inputSelector = SettingsValid.inputSelector;
    this._submitButtonSelector = SettingsValid.submitButtonSelector;
    this._inactiveButtonClass = SettingsValid.inactiveButtonClass;
    this._inputErrorClass = SettingsValid.inputErrorClass;
    this._errorClass = SettingsValid.errorClass;
    this._formElement =formElement;
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
    });
}

_toggleButtonState (inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    this._buttonStateInactive(buttonElement, this._inactiveButtonClass);
  } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
};

_hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
};

_buttonStateInactive (buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

_showInputError (inputElement, errorMessage){
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
};

_hideInputError (inputElement)  {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

_checkInputValidity (inputElement)  {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError( inputElement);
  }
};

enableValidation () {
  this._formElement.addEventListener('submit', (event) => {
    event.preventDefault();
        });
        this._setEventListeners();
  }
}
