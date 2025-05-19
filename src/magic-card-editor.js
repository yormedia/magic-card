import { LitElement, html, css } from 'lit';

class MagicCardEditor extends LitElement { // Updated class name
  static get properties() {
    return {
      hass: {},
      _config: {},
      _currentScreen: "main",
    };
  }

  constructor() {
    super();
    this._currentScreen = "main";
  }

  setConfig(config) {
    this._config = config;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const newConfig = { ...this._config };

    if (target.configValue) {
      newConfig[target.configValue] =
        target.type === "checkbox" ? target.checked : target.value;
    } else if (target.value !== undefined && ev.detail && ev.detail.value !== undefined) {
      // Handle complex elements like ha-icon-picker or ha-entity-picker
      // where the value is in event.detail.value and configValue might not be on target
      const configValue = target.getAttribute('configValue') || (ev.target.parentElement && ev.target.parentElement.getAttribute('configValue'));
      if (configValue) {
        newConfig[configValue] = ev.detail.value;
      }
    }


    this._config = newConfig;

    const event = new Event("config-changed", {
      bubbles: true,
      composed: true,
    });
    event.detail = { config: newConfig };
    this.dispatchEvent(event);
  }

  _navigateToScreen(screenName) {
    this._currentScreen = screenName;
    // No need for this.requestUpdate() explicitly if properties are correctly defined
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<div>Loading Editor...</div>`;
    }

    const mainScreen = html`
      <div class="editor-section">
        <h3>Main Magic Settings</h3>
        <ha-textfield
          label="Card Header (Optional)"
          .value="${this._config.header || ""}"
          .configValue="${"header"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-textfield
          label="Magical Text"
          .value="${this._config.text || ""}"
          .configValue="${"text"}"
          @input="${this._valueChanged}"
          required
        ></ha-textfield>
        <ha-icon-picker
            label="Magical Icon (e.g., mdi:magic-staff)"
            .value="${this._config.icon || ""}"
            .configValue="${"icon"}"
            @value-changed="${this._valueChanged}"
        ></ha-icon-picker>
        <ha-entity-picker
            label="Target Entity for Spell (Optional)"
            .hass="${this.hass}"
            .value="${this._config.action_entity_id || ""}"
            .configValue="${"action_entity_id"}"
            @value-changed="${this._valueChanged}"
            allow-custom-entity
        ></ha-entity-picker>
         <ha-textfield
            label="Spell to Cast (Service, e.g., light.toggle)"
            .value="${this._config.action_service || ""}"
            .configValue="${"action_service"}"
            @input="${this._valueChanged}"
        ></ha-textfield>
      </div>
      <mwc-button @click="${() => this._navigateToScreen("styling")}">
        Go to Arcane Styling
      </mwc-button>
    `;

    const stylingScreen = html`
      <div class="editor-section">
        <h3>Arcane Styling Options</h3>
        <ha-textarea
          label="Custom CSS Incantations"
          placeholder=".text { color: purple; font-family: 'Luminari', fantasy; } /* Example */"
          .value="${this._config.custom_style || ""}"
          .configValue="${"custom_style"}"
          @input="${this._valueChanged}"
          class="full-width-textarea"
        ></ha-textarea>
        <p class="hint">
            Style selectors: <code>.card-content</code>, <code>.icon</code>, <code>.text</code>.
        </p>
      </div>
      <mwc-button @click="${() => this._navigateToScreen("main")}">
        Back to Main Magic
      </mwc-button>
    `;

    let currentScreenHtml;
    switch (this._currentScreen) {
      case "styling":
        currentScreenHtml = stylingScreen;
        break;
      case "main":
      default:
        currentScreenHtml = mainScreen;
        break;
    }

    return html`
      <div class="card-config">
        ${currentScreenHtml}
        <div class="editor-section">
            <h3>Editor's Appearance (Styling for this Editor)</h3>
            <button class="my-editor-button">Styled Editor Button</button>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        padding: 16px;
      }
      .editor-section {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--divider-color);
      }
      .editor-section:last-child {
        border-bottom: none;
      }
      ha-textfield, ha-textarea, ha-icon-picker, ha-entity-picker {
        display: block;
        margin-bottom: 16px;
      }
      .full-width-textarea {
        width: 100%;
      }
      .hint {
        font-size: 0.9em;
        color: var(--secondary-text-color);
      }
      .my-editor-button {
        background-color: var(--primary-color); /* Or maybe a magical color? */
        color: var(--text-primary-color);
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
      .my-editor-button:hover {
        opacity: 0.8;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      }
      mwc-button {
        margin-top: 10px;
      }
    `;
  }
}

customElements.define("magic-card-editor", MagicCardEditor); // Updated custom element name