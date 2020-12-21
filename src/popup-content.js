export class PopupContent extends HTMLElement {
    constructor() {
        super();
        this.htmlUrl = "popup-content.html";
        this.selector = "popup-content";
        this.attachShadow({ mode: "open" });
    }

    static selector() {
        return "popup-content";
    }

    connectedCallback() {
        console.log(`loading html for ${this.htmlUrl}`);

        this.loadComponent(this.htmlUrl).then((content) => {
            this.shadowRoot.appendChild(content.cloneNode(true));
            this.willShow();
        });
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

    willShow() {
        // create html elements
        let fragment = document.createDocumentFragment();
        for (let i = 1; i < 41; i++) {
            let rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            let colDiv = document.createElement("div");
            colDiv.classList.add("col");
            colDiv.innerText = `col ${i}`;
            rowDiv.appendChild(colDiv);
            fragment.appendChild(rowDiv.cloneNode(true));
        }
        this.shadowRoot.getElementById("data").appendChild(fragment);
    }
}

window.customElements.define(`popup-content`, PopupContent);
