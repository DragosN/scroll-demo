import { HTMLComponent } from "./Component";

export class BasePage extends HTMLComponent {
    constructor(htmlUrl, selector) {
        super(htmlUrl, selector);
    }

    static get observedAttributes() {
        return ["visible"];
    }

    componentWillLoad() {
        this.pageComponentWillLoad();
    }

    componentLoaded() {
        this.showPage(true);
        this.pageComponentLoaded();
    }

    componentDestroy() {
        this.hidePage(true);
        this.pageComponentDestroy();
    }

    attributeHasChanged(name, oldValue, newValue) {
        console.log(`base page ${name} has changed from ${oldValue} to ${newValue}`);
        this.pageAttributeHasChanged(name, oldValue, newValue);
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

    hidePage(triggerEvent = true) {
        if (triggerEvent) {
            this.willHide();
        }
    }

    showPage(triggerEvent = false) {
        console.log(`${this.selector} show page call`);

        if (triggerEvent) {
            this.willShow();
        }
    }

    /**
     * page will be hidden from the view. a good time to remove event listeners
     */
    willHide() {}
    /**
     * page will become visible. a good time to add events listeners
     */
    willShow() {}
    /**
     * a page attribute has changed. only attribute that are in observedAttributes will trigger this event
     */
    pageAttributeHasChanged() {}
    pageComponentWillLoad() {}
    pageComponentLoaded() {}
    pageComponentDestroy() {}
}
