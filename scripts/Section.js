export default class Section { // отвечает за отрисовку элементов на странице
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item))
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
