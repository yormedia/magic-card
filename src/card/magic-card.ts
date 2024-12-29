import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { ActionHandlerEvent, getLovelace, handleAction, hasAction, hasConfigOrEntityChanged, HomeAssistant, LovelaceCard, LovelaceCardEditor } from "custom-card-helpers";
import { actionHandler } from "../global/action-handler-directives";
import { registerCustomCard } from "../global/customCard";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/card-styles";
import { MagicCardConfig } from "../types/types";
import { getCardData } from "../global/app";
import { localize } from "../functions/localize";

const card = getCardData("section");

registerCustomCard({
    type: card.type,
    name: card.name,
    description: card.description,
});

@customElement(card.type)
export class MagicCard extends LitElement {
    //   @property() protected _card?: LovelaceCard;
    @property() private config?: MagicCardConfig;
    private hass?: HomeAssistant;

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
            <ha-card header="${this.config.title || ""}">
                <div class="card-content">
                    ${this.config.show.name ? html` <div class="name">${state.attributes.friendly_name || state.entity_id}</div> ` : ""}
                    ${this.config.show.state ? html` <div class="state">${state.state}</div> ` : ""}
                </div>
            </ha-card>
        `;
    }
}
// <!-- <div class="features">${(this.config.features || []).map((feature) => html` <magic-feature-row .hass=${this.hass} .feature=${feature}></magic-feature-row> `)}</div> -->