import { LitElement, html } from "https://unpkg.com/lit@2.0.0/index.js?module";
import { handleServiceCall } from "../utils/service-handler";

export class FeatureRow extends LitElement {
    static get properties() {
        return {
            hass: { type: Object },
            feature: { type: Object },
        };
    }
}

customElements.define("magic-feature-row", FeatureRow);
