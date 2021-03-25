export default class Section { // отвечает за отрисовку элементов на странице
    constructor({ items, renderer, api }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._api = api;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        // console.log(this._renderedItems);
        this._renderedItems.forEach(item =>
            this._renderer(item)
            // console.log(item)
        )
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
