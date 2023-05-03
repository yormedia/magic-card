import { card } from "./container-card-constants";
import { HassEntity } from "home-assistant-js-websocket";
import {
  css,
  CSSResultGroup,
  html,
  nothing,
  PropertyValues,
  TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { registerCustomCard } from "../../components/custom-cards";
import {
  ActionHandlerEvent,
  getLovelace,
  handleAction,
  hasConfigOrEntityChanged,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
  hasAction,
} from "../../ha";
import { MagicBaseCard } from "../../components/base-card";
import { MagicSectionCardConfig } from "./container-card-config";
import setupCustomlocalize from "../../localize";
import { actionHandler } from "./container-action-handler-directive";

registerCustomCard(card.register);

@customElement(card.register.name)
export class MagicContainerCard extends MagicBaseCard implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: MagicSectionCardConfig;

  getCardSize(): number | Promise<number> {
    return card.size;
  }

  localize = setupCustomlocalize(this.hass);

  setConfig(config: MagicSectionCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error(this.localize("common.invalid_configuration"));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      name: card.register.type,
      ...config,
    };
  }
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import(card.editor.file);
    return document.createElement(
      card.editor.prefixedtype
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    // TODO Check for stateObj or other necessary things and render a warning if missing
    if (this.config.show_warning) {
      return this._showWarning(this.localize("common.show_warning"));
    }

    if (this.config.show_error) {
      return this._showError(this.localize("common.show_error"));
    }

    return html`
      <ha-card
        .header=${this.config.name}
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
          hasHold: hasAction(this.config.hold_action),
          hasDoubleClick: hasAction(this.config.double_tap_action),
        })}
        tabindex="0"
        .label=${`${card.register.type}: ${
          this.config.entity || "No Entity Defined"
        }`}
      ></ha-card>
    `;
  }

  private _handleAction(ev: ActionHandlerEvent): void {
    if (this.hass && this.config && ev.detail.action) {
      handleAction(this, this.hass, this.config, ev.detail.action);
    }
  }

  private _showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement("hui-error-card");
    errorCard.setConfig({
      type: "error",
      error,
      origConfig: this.config,
    });

    return html` ${errorCard} `;
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css``;
  }
}
