export class HTMLComponent extends HTMLElement {
    constructor(htmlUrl, selector) {
        super();
        this.htmlUrl = htmlUrl;
        this.selector = selector;
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        console.log(`loading html for ${this.htmlUrl}`);
        this.componentWillLoad();

        this.loadComponent(this.htmlUrl).then((content) => {
            this.shadowRoot.appendChild(content.cloneNode(true));
            this.componentLoaded();
        });
    }

    disconnectedCallback() {
        this.componentDestroy();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`${this.selector} attribute ${name} changed from ${oldValue} to ${newValue}`);
        this.attributeHasChanged(name, oldValue, newValue);
    }

    loadComponent(URL) {
        return fetch(URL)
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                return this.htmlToElem(html);
            });
    }

    htmlToElem(html) {
        let temp = document.createElement("template");
        let div = document.createElement("div");
        div.setAttribute("id", this.selector);
        html = html.trim(); // Never return a space text node as a result
        div.innerHTML = html;
        temp.innerHTML = div.outerHTML;
        return temp.content;
    }

    /**
     * a page attribute has changed. only attribute that are in observedAttributes will trigger this event
     */
    attributeHasChanged() {}
    componentWillLoad() {}
    componentLoaded() {}
    componentDestroy() {}
}
