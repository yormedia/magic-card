import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { ActionHandlerEvent, getLovelace, handleAction, hasAction, hasConfigOrEntityChanged, HomeAssistant, LovelaceCard, LovelaceCardEditor } from "custom-card-helpers";
import { actionHandler } from "../global/action-handler-directives";
import { registerCustomCard } from "../global/customCard";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/card-styles";
import { MagicCardConfig } from "../types/types";
import { getCardData } from "../global/app";
import { localize } from "../functions/localize";

const card = getCardData();

registerCustomCard({
    type: card.type,
    name: card.name,
    description: card.description,
});

@customElement(card.type)
export class MagicCard extends LitElement {
    public static async getConfigElement(): Promise<LovelaceCardEditor> {
        await import("../editor/magic-card-editor");
        return document.createElement(card.editor.type) as LovelaceCardEditor;
    }

    @property() protected card?: LovelaceCard;
    @property() private config?: MagicCardConfig;
    // @property({ attribute: false }) public hass!: HomeAssistant;
    private hass!: HomeAssistant;

    static get properties() {
        return {
            hass: { type: Object },
            config: { type: Object },
        };
    }

    static get styles() {
        return cardStyles;
    }

    static getStubConfig(): MagicCardConfig {
        return {
            name: "Magic Card",
            entity: "",
            show: {
                name: true,
                state: true,
            },
            test_gui: true,
        };
    }

    setConfig(config: MagicCardConfig) {
        if (!config) {
            throw new Error(localize("common.invalid_configuration"));
        }
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
        const state = this.hass.states[""];

        if (!state) {
            return html`
                <ha-card>
                    <div class="warning">Entity not found: ${entityId}</div>
                </ha-card>
            `;
        }

        return html`
            <ha-card header="${this.config.name || ""}">
                <div class="card-content">
                    ${this.config.show.name ? html` <div class="name">${state.attributes.friendly_name || state.entity_id}</div> ` : ""}
                    ${this.config.show.state ? html` <div class="state">${state.state}</div> ` : ""}
                </div>
            </ha-card>
        `;
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns in masonry view
    getCardSize() {
        return 3;
    }

    // The rules for sizing your card in the grid in sections view
    getLayoutOptions() {
        return {
            grid_rows: 3,
            grid_columns: 2,
            grid_min_rows: 3,
            grid_max_rows: 3,
        };
    }
}

customElements.define("magic-card", MagicCard);
// <!-- <div class="features">${(this.config.features || []).map((feature) => html` <magic-feature-row .hass=${this.hass} .feature=${feature}></magic-feature-row> `)}</div> -->
