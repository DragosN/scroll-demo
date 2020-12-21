"use strict";
// global css
import "./popup.css";

(function () {
    function loadHtml() {
        let fragment = document.createDocumentFragment();
        for (let i = 1; i < 41; i++) {
            let rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            let colDiv = document.createElement("div");
            colDiv.classList.add("col");
            colDiv.innerText = `col ${i}`;
            rowDiv.appendChild(colDiv);

            // DOES NOT WORK
            // this.shadowRoot
            //     .getElementById("app")
            //     .appendChild(rowDiv.cloneNode(true));

            fragment.appendChild(rowDiv.cloneNode(true));
        }
        // DOES NOT WORK
        // this.shadowRoot.getElementById("app").appendChild(fragment);
        
        document.getElementById("app").appendChild(fragment);
    }

    document.addEventListener("DOMContentLoaded", loadHtml);
})();
