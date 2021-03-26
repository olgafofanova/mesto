//отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
    constructor(nameSelector, descriptionSelector, avatarSelector) {
        this._nameSelector = document.querySelector(nameSelector);
        this._descriptionSelector = document.querySelector(descriptionSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }

    // возвращает объект с данными пользователя.
    // нужен, когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
        return { name: this._nameSelector.textContent, about: this._descriptionSelector.textContent }
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._nameSelector.textContent = data.name;
        this._descriptionSelector.textContent = data.about;
        this._id = data._id;
        this._avatarSelector.src=data.avatar;

    }
}
