//отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    getUserInfo() { //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

    }

    setUserInfo() { //принимает новые данные пользователя и добавляет их на страницу

    }
}
