import { LitElement, html, css } from 'lit';
class MagicCard extends LitElement {
  static get properties() {
    return {
      hass: {}, // Home Assistant object
      config: {}, // Card configuration
    };
  }

  constructor() {
    super();
    this.config = {
      text: "Default Magical Text",
      icon: "mdi:magic-staff",
      action_service: "",
      action_entity_id: "",
      custom_style: "",
    };
  }

  setConfig(config) {
    if (!config.text) {
      console.warn("Text not defined for Magic Card, using default.");
    }
    this.config = {
      ...this.config,
      ...config,
    };
  }

  render() {
    const style = this.config.custom_style || "";

    return html`
      <style>
        .card-content {
          display: flex;
          align-items: center;
          padding: 16px;
          cursor: pointer;
        }
        .icon {
          margin-right: 16px;
        }
        .text {
          font-size: 1.2em;
        }
        ${style}
      </style>
      <ha-card .header="${this.config.header || "Magic Card"}">
        <div class="card-content" @click="${this._handleAction}">
          ${this.config.icon
            ? html`<ha-icon class="icon" .icon="${this.config.icon}"></ha-icon>`
            : ""}
          <div class="text">${this.config.text || "No Text Set"}</div>
        </div>
      </ha-card>
    `;
  }

  _handleAction() {
    if (this.hass && this.config.action_service && this.config.action_entity_id) {
      this.hass.callService(
        this.config.action_service.split(".")[0],
        this.config.action_service.split(".")[1],
        { entity_id: this.config.action_entity_id }
      );
      console.log(
        `MagicCard Action: ${this.config.action_service} for ${this.config.action_entity_id}`
      );
    } else if (this.config.action_tap_action) {
        console.log('MagicCard Advanced tap action:', this.config.action_tap_action);
    } else {
      console.log("MagicCard clicked, no specific action configured.");
    }
  }

  getCardSize() {
    return 3;
  }

  static async getConfigElement() {
    await import("./magic-card-editor.js"); // Updated import path
    return document.createElement("magic-card-editor"); // Updated element name
  }

  static getStubConfig() {
    return {
      text: "Abracadabra!",
      icon: "mdi:magic-staff",
      action_service: "light.toggle",
      action_entity_id: "light.your_enchanted_light",
      custom_style: "/* .text { color: purple; } */",
    };
  }

  static get styles() {
    return css`
      ha-card {
        /* Add any default styles for the magic card itself */
      }
    `;
  }
}

customElements.define("magic-card", MagicCard); // Updated custom element name

window.customCards = window.customCards || [];
window.customCards.push({
  type: "magic-card", // Updated type
  name: "Magic Card", // Updated name
  description: "A magical custom card with text, icon, actions, and a two-screen editor.",
  preview: true,
});