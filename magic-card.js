import { LitElement, html, css } from "https://unpkg.com/lit@2.0.0/index.js?module";

class MagicCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    };
  }

  static get styles() {
    return css`
      .warning {
        padding: 8px;
        color: #d32f2f;
      }
      .card-content {
        padding: 16px;
      }
      .name {
        font-weight: bold;
        margin-bottom: 8px;
      }
      .features {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .feature-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        border-radius: 4px;
        background: var(--secondary-background-color);
      }
    `;
  }

  static getConfigElement() {
    return document.createElement("magic-card-editor");
  }

  static getStubConfig() {
    return {
      title: "Magic Card",
      entity: "",
      show_name: true,
      show_state: true,
      features: []
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Please define an entity");
    }
    this.config = config;
  }

  _handleFeatureClick(feature) {
    if (!feature.entity_id || !feature.service) return;
    
    const [domain, service] = feature.service.split(".");
    this.hass.callService(domain, service, {
      entity_id: feature.entity_id,
      ...feature.service_data
    });
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
          <div class="warning">
            Entity not found: ${entityId}
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card header="${this.config.title || ''}">
        <div class="card-content">
          ${this.config.show_name ? html`<div class="name">${state.attributes.friendly_name || state.entity_id}</div>` : ''}
          ${this.config.show_state ? html`<div class="state">${state.state}</div>` : ''}
          
          <div class="features">
            ${(this.config.features || []).map(feature => html`
              <div class="feature-row" @click=${() => this._handleFeatureClick(feature)}>
                <div>${feature.name || ''}</div>
                <div>${feature.show_state && feature.entity_id ? this.hass.states[feature.entity_id]?.state || '' : ''}</div>
              </div>
            `)}
          </div>
        </div>
      </ha-card>
    `;
  }
}

class MagicCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    };
  }

  static get styles() {
    return css`
      .card-config {
        padding: 16px;
      }
      ha-formfield {
        display: block;
        margin: 8px 0;
      }
      .features {
        margin-top: 16px;
      }
      .feature {
        border: 1px solid var(--divider-color);
        padding: 12px;
        margin-top: 8px;
        border-radius: 4px;
      }
      .feature-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .feature-content {
        margin-top: 8px;
      }
      .add-feature {
        margin-top: 8px;
      }
    `;
  }

  setConfig(config) {
    this.config = {
      ...config,
      features: config.features || []
    };
  }

  _addFeature() {
    const features = this.config.features || [];
    features.push({
      name: `Feature ${features.length + 1}`,
      entity_id: "",
      service: "",
      show_state: true
    });

    this._valueChanged({
      detail: {
        config: {
          ...this.config,
          features
        }
      }
    });
  }

  _removeFeature(index) {
    const features = [...this.config.features];
    features.splice(index, 1);
    
    this._valueChanged({
      detail: {
        config: {
          ...this.config,
          features
        }
      }
    });
  }

  _updateFeature(index, property, value) {
    const features = [...this.config.features];
    features[index] = {
      ...features[index],
      [property]: value
    };

    this._valueChanged({
      detail: {
        config: {
          ...this.config,
          features
        }
      }
    });
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        <ha-textfield
          label="Title"
          .value="${this.config.title || ''}"
          .configValue="${"title"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        
        <ha-entity-picker
          .hass="${this.hass}"
          .value="${this.config.entity || ''}"
          .configValue="${"entity"}"
          @value-changed="${this._valueChanged}"
        ></ha-entity-picker>

        <ha-formfield label="Show Name">
          <ha-switch
            .checked="${this.config.show_name ?? true}"
            .configValue="${"show_name"}"
            @change="${this._valueChanged}"
          ></ha-switch>
        </ha-formfield>

        <ha-formfield label="Show State">
          <ha-switch
            .checked="${this.config.show_state ?? true}"
            .configValue="${"show_state"}"
            @change="${this._valueChanged}"
          ></ha-switch>
        </ha-formfield>

        <div class="features">
          <h3>Features</h3>
          ${(this.config.features || []).map((feature, index) => html`
            <div class="feature">
              <div class="feature-header">
                <h4>Feature ${index + 1}</h4>
                <ha-icon-button
                  .path=${"M19,13H5V11H19V13Z"}
                  @click=${() => this._removeFeature(index)}
                ></ha-icon-button>
              </div>
              <div class="feature-content">
                <ha-textfield
                  label="Name"
                  .value="${feature.name || ''}"
                  @input="${(e) => this._updateFeature(index, 'name', e.target.value)}"
                ></ha-textfield>
                
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${feature.entity_id || ''}"
                  @value-changed="${(e) => this._updateFeature(index, 'entity_id', e.detail.value)}"
                ></ha-entity-picker>

                <ha-textfield
                  label="Service (e.g., light.toggle)"
                  .value="${feature.service || ''}"
                  @input="${(e) => this._updateFeature(index, 'service', e.target.value)}"
                ></ha-textfield>

                <ha-formfield label="Show State">
                  <ha-switch
                    .checked="${feature.show_state ?? true}"
                    @change="${(e) => this._updateFeature(index, 'show_state', e.target.checked)}"
                  ></ha-switch>
                </ha-formfield>
              </div>
            </div>
          `)}
          
          <div class="add-feature">
            <mwc-button @click=${this._addFeature}>
              Add Feature
            </mwc-button>
          </div>
        </div>
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this.config || !this.hass) {
      return;
    }

    const target = ev.target;
    const value = target?.value || target?.checked;
    const configValue = target?.configValue;

    let newConfig;
    if (configValue) {
      newConfig = {
        ...this.config,
        [configValue]: value
      };
    } else if (ev.detail?.config) {
      newConfig = ev.detail.config;
    } else {
      return;
    }

    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define("magic-card", MagicCard);
customElements.define("magic-card-editor", MagicCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "magic-card",
  name: "Magic Card",
  description: "A magical custom card with feature rows",
});