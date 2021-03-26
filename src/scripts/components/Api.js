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

    getInitialCards() {
      // ...
    }


    // getInfo() {
    //     return fetch(this.url, {
    //             headers: this.headers,
    //         })
    //         .then(res => this._parseResponse(res))
    //         .catch(err => Promise.reject(err));
    // }


    postInfo(url, data) {
          console.log(data);
        return fetch(`${this.baseUrl}${url}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(
                  data
              ),
            })
            .then(res => this._parseResponse(res))
            .catch(err => Promise.reject(err));
    }

    getUser() {
     // this.getInfo(`${this.baseUrl}/users/me`);
     return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
  })
  .then(res => this._parseResponse(res))
  .catch(err => Promise.reject(err));
    }

    getCards() {
     // this.getInfo(`${this.baseUrl}/cards`);
      return fetch(`${this.baseUrl}/cards`, {
              headers: this.headers,
          })
          .then(res => this._parseResponse(res))
          .catch(err => Promise.reject(err));
    }

    createCard({ name, link}) {
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


    editUser({ name, about}) {
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

    // deleteTask(id) {
    //     return fetch(`${this.url}/${id}`, {
    //             method: 'DELETE',
    //             headers: this.headers,
    //         })
    //         .then(res => this._parseResponse(res))
    //         .catch(msg => Promise.reject(new Error(msg)));
    // }
}
