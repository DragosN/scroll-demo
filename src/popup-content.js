import { BasePage } from "./BasePage";

const selector = "popup-content";
const htmlUrl = "popup-content.html";

export class PopupContent extends BasePage {
    static selector() {
        return selector;
    }

    constructor() {
        super(htmlUrl, selector);
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

window.customElements.define(`${selector}`, PopupContent);
