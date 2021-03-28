export default class Api {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
    }

    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    }

    postInfo(url, method, data) {
        return fetch(`${this.baseUrl}${url}`, {
                method: method,
                headers: this.headers,
                body: JSON.stringify(
                    data
                ),
            })
            .then(res => this._parseResponse(res))
            .catch(err => Promise.reject(err));
    }

    getUser() {
        return fetch(`${this.baseUrl}/users/me`, {
                headers: this.headers,
            })
            .then(res => this._parseResponse(res))
            .catch(err => Promise.reject(err));
    }

    editUser({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    name,
                    about
                }),
            })
            .then(res => this._parseResponse(res))
            .catch(msg => Promise.reject(new Error(msg)));
    }

    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
                headers: this.headers,
            })
            .then(res => this._parseResponse(res))
            .catch(err => Promise.reject(err));
    }

    createCard({ name, link }) {
        return fetch(`${this.baseUrl}/cards`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    name,
                    link
                }),
            })
            .then(res => this._parseResponse(res))
            .catch(msg => Promise.reject(new Error(msg)));
    }

    deleteCard({ _id }) {
        return fetch(`${this.baseUrl}/cards/${_id}`, {
                method: 'DELETE',
                headers: this.headers,
            })
            .then(res => this._parseResponse(res))
            .catch(msg => Promise.reject(new Error(msg)));
    }

    likeCard({ _id }) {
        return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
                method: 'PUT',
                headers: this.headers
            })
            .then(res => this._parseResponse(res))
            .catch(msg => Promise.reject(new Error(msg)));
    }

    likeCardDelete({ _id }) {
        return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(res => this._parseResponse(res))
            .catch(msg => Promise.reject(new Error(msg)));
    }

}
