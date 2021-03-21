//отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
    constructor(nameSelector, descriptionSelector) {
        this._nameSelector = document.querySelector(nameSelector);
        this._descriptionSelector = document.querySelector(descriptionSelector);
    }

    // возвращает объект с данными пользователя.
    // нужен, когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
        return { name: this._nameSelector.textContent, description: this._descriptionSelector.textContent }
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._nameSelector.textContent = data.name;
        this._descriptionSelector.textContent = data.description;
    }
}