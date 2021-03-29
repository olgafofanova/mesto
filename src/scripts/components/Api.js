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
            .then(res => this._parseResponse(res));
    }

    getUser() {
        return fetch(`${this.baseUrl}/users/me`, {
                headers: this.headers,
            })
            .then(res => this._parseResponse(res));
    }

    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
                headers: this.headers,
            })
            .then(res => this._parseResponse(res));
    }

    deleteCard({ _id }) {
        return fetch(`${this.baseUrl}/cards/${_id}`, {
                method: 'DELETE',
                headers: this.headers,
            })
            .then(res => this._parseResponse(res));
    }

    likeCard({ _id }) {
        return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
                method: 'PUT',
                headers: this.headers
            })
            .then(res => this._parseResponse(res));
    }

    likeCardDelete({ _id }) {
        return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(res => this._parseResponse(res));
    }

}
