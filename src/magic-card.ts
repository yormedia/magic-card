import { LitElement, html } from "https://unpkg.com/lit@2.0.0/index.js?module";
import { cardStyles } from "./styles/card-styles";
import "./components/feature-row";
import { MagicCardConfig } from "./types/types";

export class MagicCard extends LitElement {
    static get properties() {
        return {
            hass: { type: Object },
            config: { type: Object },
        };
    }

    static get styles() {
        return cardStyles;
    }

    static getConfigElement() {
        return document.createElement("magic-card-editor");
    }

    static getStubConfig(): MagicCardConfig {
        return {
            title: "Magic Card",
            entity: "",
            show_name: true,
            show_state: true,
            features: [],
        };
    }

    setConfig(config: MagicCardConfig) {
        if (!config.entity) {
            throw new Error("Please define an entity");
        }
        this.config = config;
    }

    render() {
        if (!this.config || !this.hass) {
            return html``;
        }

        const entityId = this.config.entity;
        const state = this.hass.states[entityId];

        if (!state) {
            return html`
                <ha-card>
                    <div class="warning">Entity not found: ${entityId}</div>
                </ha-card>
            `;
        }

        return html`
            <ha-card header="${this.config.title || ""}">
                <div class="card-content">
                    ${this.config.show_name ? html` <div class="name">${state.attributes.friendly_name || state.entity_id}</div> ` : ""}
                    ${this.config.show_state ? html` <div class="state">${state.state}</div> ` : ""}

                    <div class="features">${(this.config.features || []).map((feature) => html` <magic-feature-row .hass=${this.hass} .feature=${feature}></magic-feature-row> `)}</div>
                </div>
            </ha-card>
        `;
    }
}
