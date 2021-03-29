export default class FormValidator {
    constructor(formElement, SettingsValid) {
        this._formSelector = SettingsValid.formSelector;
        this._inputSelector = SettingsValid.inputSelector;
        this._submitButtonSelector = SettingsValid.submitButtonSelector;
        this._inactiveButtonClass = SettingsValid.inactiveButtonClass;
        this._inputErrorClass = SettingsValid.inputErrorClass;
        this._errorClass = SettingsValid.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));  // перечень инпутов формы
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);  // кнопка сабмита
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.buttonStateInactive(this._inactiveButtonClass);
        } else {
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.removeAttribute('disabled');
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    buttonStateInactive(inactiveButtonClass) {
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
  };

    enableValidation() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        this._formElement.addEventListener('reset', () => {
          this._inputList.forEach((inputElement) => {
              this._hideInputError(inputElement)
              this._toggleButtonState();
          })
      });

        this._setEventListeners();
    }
}
