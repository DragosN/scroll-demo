"use strict";
// global css
import "./popup.css";

import "./popup-content.js";
import { PopupContent } from "./popup-content.js";

(function () {
    function loadHtml() {
        document.getElementById("app").appendChild(document.createElement(PopupContent.selector()));
    }

    document.addEventListener("DOMContentLoaded", loadHtml);
})();
