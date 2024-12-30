import { LitElement, html, TemplateResult, css, CSSResultGroup } from "lit";
import { HomeAssistant, fireEvent, LovelaceCardEditor } from "custom-card-helpers";

import { getCardData } from "../global/app";
const card = getCardData();

import { MagicCardConfig } from "../types/types";
import { customElement, property, state } from "lit/decorators";
import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin/scoped-registry-mixin";

// import { formfieldDefinition } from "../../../elements/formfield";
// import { selectDefinition } from "../../../elements/select";
// import { switchDefinition } from "../../../elements/switch";
// import { textfieldDefinition } from "../../../elements/textfield";
// import { tabDefinition } from "../../../elements/tab";
// import { tabbarDefinition } from '../../../elements/tab-bar';

import { localize } from "../functions/localize";

// const DEFAULT_LAYOUT_TYPES = ["masonry", "sidebar", "panel", "section"];

@customElement(card.editor.type)
export class MagicCardEditor extends ScopedRegistryHost(LitElement) {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private config?: MagicCardConfig;

    @state() private _helpers?: any;

    @state() _selectedTab = 0;
    @state() _selectedCard = 0;

    private _initialized = false;

    _handleSwitchTab(ev: CustomEvent) {
        this._selectedTab = parseInt(ev.detail.index, 10);
    }

    public setConfig(config: MagicCardConfig): void {
        this.config = config;
        this.loadCardHelpers();
    }

    protected shouldUpdate(): boolean {
        if (!this._initialized) {
            this._initialize();
        }

        return true;
    }

    get _name(): string {
        return this.config?.name || "";
    }

    get _entity(): string {
        return this.config?.entity || "";
    }

    get _show_name(): boolean {
        return this.config?.show.name || false;
    }

    get _show_state(): boolean {
        return this.config?.show.state || false;
    }

    protected render(): TemplateResult | void {
        if (!this.hass || !this._helpers) {
            return html``;
        }

        return html`
            <div class="card-config">
                <div class="toolbar">
                    <md-tab-bar .activeIndex=${this._selectedTab} @mdTabBar:activated=${this._handleSwitchTab}>
                        <md-tab .label=${"Data"}>
                            <button role="tab" aria-selected="true" tabindex="0" class="md-tab md-tab--active">
                                <span class="md-tab__content">
                                    <span class="md-tab__text-label">Design</span>
                                </span>
                                <md-ripple primary=""></md-ripple>
                            </button>
                        </md-tab>
                        <md-tab .label=${"Design"}>
                            <button role="tab" aria-selected="true" tabindex="0" class="md-tab md-tab--active">
                                <span class="md-tab__content">
                                    <span class="md-tab__text-label">Section</span>
                                </span>
                                <md-ripple primary=""></md-ripple>
                            </button>
                        </md-tab>
                    </md-tab-bar>
                </div>
                <div id="editor">${[this._renderDataEditor, this._renderDesignEditor][this._selectedTab].bind(this)()}</div>
            </div>
        `;
    }

    _renderDataEditor() {
        // You can restrict on domain type
        if (!this.hass || !this._helpers) {
            return html``;
        }

        const entities = Object.keys(this.hass.states);
        const data = {
            ...this.config,
        };
        return html`
            <div class="card-config">
                <div id="editor">
                    <md-filled-select required
                        label="Entity (Required)"
                        .configValue=${"entity"}
                        .value=${this._entity}
                        @selected=${this._valueChanged}
                        @closed=${(ev) => ev.stopPropagation()}
                    >
                        ${entities.map((entity) => {
                            return html`<md-select-option .value=${entity}>${entity}</md-select-option>`;
                        })}
                    </md-filles-select>
                    <md-textfield label="Name (Optional)" .value=${this._name} .configValue=${"name"} @input=${this._valueChanged}></md-textfield>
                    <md-formfield .label=${`Toggle warning ${this._show_name ? "off" : "on"}`}>
                        <md-switch .checked=${this._show_name} .configValue=${"show_name"} @change=${this._valueChanged}></md-switch>
                    </md-formfield>
                    <md-formfield .label=${`Toggle error ${this._show_state ? "off" : "on"}`}>
                        <md-switch .checked=${this._show_state} .configValue=${"show_state"} @change=${this._valueChanged}></md-switch>
                    </md-formfield>
                </div>
            </div>
        `;
    }

    _renderDesignEditor() {
        const selected = this._selectedCard;
        // const numcards = this.config.cards.length;
        return html` <p>Hello I am the design tab.</p> `;
    }

    private _initialize(): void {
        if (this.hass === undefined) return;
        if (this.config === undefined) return;
        if (this._helpers === undefined) return;
        this._initialized = true;
    }

    private async loadCardHelpers(): Promise<void> {
        this._helpers = await (window as any).loadCardHelpers();
    }

    private _valueChanged(ev): void {
        if (!this.config || !this.hass) {
            return;
        }
        const target = ev.target;
        if (this[`_${target.configValue}`] === target.value) {
            return;
        }
        if (target.configValue) {
            if (target.value === "") {
                const tmpConfig = { ...this.config };
                delete tmpConfig[target.configValue];
                this.config = tmpConfig;
            } else {
                this.config = {
                    ...this.config,
                    [target.configValue]: target.checked !== undefined ? target.checked : target.value,
                };
            }
        }
        fireEvent(this, "config-changed", { config: this.config });
    }

    static styles: CSSResultGroup = css`
        md-select,
        md-textfield {
            margin-bottom: 16px;
            display: block;
        }
        md-formfield {
            padding-bottom: 8px;
        }
        md-switch {
            --md-theme-secondary: var(--switch-checked-color);
        }
        md-tab-bar {
            border-bottom: 1px solid var(--divider-color);
        }
        .layout,
        .cards #editor {
            margin-top: 8px;
            border: 1px solid var(--divider-color);
            padding: 12px;
        }
        .cards .toolbar {
            display: flex;
            --paper-tabs-selection-bar-color: var(--primary-color);
            --paper-tab-ink: var(--primary-color);
        }
        paper-tabs {
            display: flex;
            font-size: 14px;
            flex-grow: 1;
        }
    `;
}
