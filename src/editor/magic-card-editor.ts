import { LitElement, html } from "lit";
import { editorStyles } from "../styles/editor-styles";
import "../components/feature-editor";
import { MagicCardConfig, FeatureConfig } from "../types/types";

export class MagicCardEditor extends LitElement {
    static get properties() {
        return {
            hass: { type: Object },
            _config: { type: Object },
        };
    }

    static get styles() {
        return editorStyles;
    }

    setConfig(config: MagicCardConfig) {
        this._config = {
            ...config,
            features: config.features || [],
        };
    }

    _addFeature() {
        const features = [...this._config.features];
        features.push({
            name: `Feature ${features.length + 1}`,
            entity_id: "",
            service: "",
            show_state: true,
        });

        this._emit(features);
    }
    

    _removeFeature(index: number) {
        const features = [...this._config.features];
        features.splice(index, 1);
        this._emit(features);
    }

    _updateFeature(index: number, property: string, value: any) {
        const features = [...this._config.features];
        features[index] = {
            ...features[index],
            [property]: value,
        };
        this._emit(features);
    }

    _emit(features: FeatureConfig[]) {
        const event = new CustomEvent("config-changed", {
            detail: {
                config: {
                    ...this._config,
                    features,
                },
            },
        });
        this.dispatchEvent(event);
    }

    render() {
        if (!this.hass) return html``;

        return html`
            <div class="card-config">
                <ha-textfield label="Title" .value="${this._config.title || ""}" @input="${(e) => this._emit([...this._config.features])}"></ha-textfield>

                <ha-entity-picker .hass="${this.hass}" .value="${this._config.entity || ""}" @value-changed="${(e) => this._emit([...this._config.features])}"></ha-entity-picker>

                <ha-formfield label="Show Name">
                    <ha-switch .checked="${this._config.show_name ?? true}" @change="${(e) => this._emit([...this._config.features])}"></ha-switch>
                </ha-formfield>

                <ha-formfield label="Show State">
                    <ha-switch .checked="${this._config.show_state ?? true}" @change="${(e) => this._emit([...this._config.features])}"></ha-switch>
                </ha-formfield>

                <div class="features">
                    <h3>Features</h3>
                    ${(this._config.features || []).map(
                        (feature, index) => html`
                            <magic-feature-editor
                                .hass=${this.hass}
                                .feature=${feature}
                                .index=${index}
                                @remove=${() => this._removeFeature(index)}
                                @feature-update=${(e) => this._updateFeature(index, e.detail.property, e.detail.value)}
                            ></magic-feature-editor>
                        `
                    )}

                    <div class="add-feature">
                        <mwc-button @click=${this._addFeature}> Add Feature </mwc-button>
                    </div>
                </div>
            </div>
        `;
    }
}