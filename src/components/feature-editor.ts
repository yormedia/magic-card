import { LitElement, html } from "https://unpkg.com/lit@2.0.0/index.js?module";

export class FeatureEditor extends LitElement {
    static get properties() {
        return {
            hass: { type: Object },
            feature: { type: Object },
            index: { type: Number },
        };
    }

    render() {
        return html`
            <div class="feature">
                <div class="feature-header">
                    <h4>Feature ${this.index + 1}</h4>
                    <ha-icon-button .path=${"M19,13H5V11H19V13Z"} @click=${() => this.dispatchEvent(new CustomEvent("remove"))}></ha-icon-button>
                </div>
                <div class="feature-content">
                    <ha-textfield label="Name" .value="${this.feature.name || ""}" @input="${(e) => this._updateFeature("name", e.target.value)}"></ha-textfield>

                    <ha-entity-picker .hass="${this.hass}" .value="${this.feature.entity_id || ""}" @value-changed="${(e) => this._updateFeature("entity_id", e.detail.value)}"></ha-entity-picker>

                    <ha-textfield label="Service (e.g., light.toggle)" .value="${this.feature.service || ""}" @input="${(e) => this._updateFeature("service", e.target.value)}"></ha-textfield>

                    <ha-formfield label="Show State">
                        <ha-switch .checked="${this.feature.show_state ?? true}" @change="${(e) => this._updateFeature("show_state", e.target.checked)}"></ha-switch>
                    </ha-formfield>
                </div>
            </div>
        `;
    }

    _updateFeature(property, value) {
        this.dispatchEvent(
            new CustomEvent("feature-update", {
                detail: { property, value },
            })
        );
    }
}

customElements.define("magic-feature-editor", FeatureEditor);
