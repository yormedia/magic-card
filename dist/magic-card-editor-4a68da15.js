import { n, S, g as getCardData, x, i, _ as __decorate, e as e$1, s } from './index-e3689cea.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$1(t){return n({...t,state:!0})}

var t,r;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none";}(t||(t={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24";}(r||(r={}));var ne=function(e,t,r,n){n=n||{},r=null==r?{}:r;var i=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return i.detail=r,e.dispatchEvent(i),i};

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e(e){return class extends e{createRenderRoot(){const e=this.constructor,{registry:s,elementDefinitions:n,shadowRootOptions:o}=e;n&&!s&&(e.registry=new CustomElementRegistry,Object.entries(n).forEach((([t,s])=>e.registry.define(t,s))));const i=this.renderOptions.creationScope=this.attachShadow({...o,customElements:e.registry});return S(i,this.constructor.elementStyles),i}}}

const card = getCardData();
// const DEFAULT_LAYOUT_TYPES = ["masonry", "sidebar", "panel", "section"];
let MagicCardEditor = class MagicCardEditor extends e(s) {
    constructor() {
        super(...arguments);
        this._selectedTab = 0;
        this._selectedCard = 0;
        this._initialized = false;
    }
    _handleSwitchTab(ev) {
        this._selectedTab = parseInt(ev.detail.index, 10);
    }
    setConfig(config) {
        this.config = config;
        this.loadCardHelpers();
    }
    shouldUpdate() {
        if (!this._initialized) {
            this._initialize();
        }
        return true;
    }
    get _name() {
        var _a;
        return ((_a = this.config) === null || _a === void 0 ? void 0 : _a.name) || "";
    }
    get _entity() {
        var _a;
        return ((_a = this.config) === null || _a === void 0 ? void 0 : _a.entity) || "";
    }
    get _show_warning() {
        var _a;
        return ((_a = this.config) === null || _a === void 0 ? void 0 : _a.show.name) || false;
    }
    get _show_error() {
        var _a;
        return ((_a = this.config) === null || _a === void 0 ? void 0 : _a.show.state) || false;
    }
    render() {
        if (!this.hass || !this._helpers) {
            return x ``;
        }
        return x `
            <div class="card-config">
                <div class="toolbar">
                    <md-tab-bar .activeIndex=${this._selectedTab} @MDCTabBar:activated=${this._handleSwitchTab}>
                        <md-tab .label=${"Data"}>
                            <button role="tab" aria-selected="true" tabindex="0" class="mdc-tab mdc-tab--active">
                                <span class="mdc-tab__content">
                                    <span class="mdc-tab__text-label">Design</span>
                                </span>
                                <md-ripple primary=""></md-ripple>
                            </button>
                        </md-tab>
                        <md-tab .label=${"Design"}>
                            <button role="tab" aria-selected="true" tabindex="0" class="mdc-tab mdc-tab--active">
                                <span class="mdc-tab__content">
                                    <span class="mdc-tab__text-label">Section</span>
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
            return x ``;
        }
        const entities = Object.keys(this.hass.states);
        Object.assign({}, this.config);
        return x `
            <div class="card-config">
                <div id="editor">
                    <md-select
                        naturalMenuWidth
                        fixedMenuPosition
                        label="Entity (Required)"
                        .configValue=${"entity"}
                        .value=${this._entity}
                        @selected=${this._valueChanged}
                        @closed=${(ev) => ev.stopPropagation()}
                    >
                        ${entities.map((entity) => {
            return x `<md-list-item .value=${entity}>${entity}</md-list-item>`;
        })}
                    </md-select>
                    <md-textfield label="Name (Optional)" .value=${this._name} .configValue=${"name"} @input=${this._valueChanged}></md-textfield>
                    <md-formfield .label=${`Toggle warning ${this._show_warning ? "off" : "on"}`}>
                        <md-switch .checked=${this._show_warning} .configValue=${"show_warning"} @change=${this._valueChanged}></md-switch>
                    </md-formfield>
                    <md-formfield .label=${`Toggle error ${this._show_error ? "off" : "on"}`}>
                        <md-switch .checked=${this._show_error} .configValue=${"show_error"} @change=${this._valueChanged}></md-switch>
                    </md-formfield>
                </div>
            </div>
        `;
    }
    _renderDesignEditor() {
        this._selectedCard;
        // const numcards = this.config.cards.length;
        return x ` <p>Hello I am the design tab.</p> `;
    }
    _initialize() {
        if (this.hass === undefined)
            return;
        if (this.config === undefined)
            return;
        if (this._helpers === undefined)
            return;
        this._initialized = true;
    }
    async loadCardHelpers() {
        this._helpers = await window.loadCardHelpers();
    }
    _valueChanged(ev) {
        if (!this.config || !this.hass) {
            return;
        }
        const target = ev.target;
        if (this[`_${target.configValue}`] === target.value) {
            return;
        }
        if (target.configValue) {
            if (target.value === "") {
                const tmpConfig = Object.assign({}, this.config);
                delete tmpConfig[target.configValue];
                this.config = tmpConfig;
            }
            else {
                this.config = Object.assign(Object.assign({}, this.config), { [target.configValue]: target.checked !== undefined ? target.checked : target.value });
            }
        }
        ne(this, "config-changed", { config: this.config });
    }
};
MagicCardEditor.styles = i `
        md-select,
        md-textfield {
            margin-bottom: 16px;
            display: block;
        }
        md-formfield {
            padding-bottom: 8px;
        }
        md-switch {
            --mdc-theme-secondary: var(--switch-checked-color);
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
__decorate([
    n({ attribute: false })
], MagicCardEditor.prototype, "hass", void 0);
__decorate([
    t$1()
], MagicCardEditor.prototype, "config", void 0);
__decorate([
    t$1()
], MagicCardEditor.prototype, "_helpers", void 0);
__decorate([
    t$1()
], MagicCardEditor.prototype, "_selectedTab", void 0);
__decorate([
    t$1()
], MagicCardEditor.prototype, "_selectedCard", void 0);
MagicCardEditor = __decorate([
    e$1(card.editor.type)
], MagicCardEditor);

export { MagicCardEditor };
