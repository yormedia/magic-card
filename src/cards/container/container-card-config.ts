import {
  ActionConfig,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from "../../ha";

declare global {
  interface HTMLElementTagNameMap {
    "magic-container-card-editor": LovelaceCardEditor;
    "hui-error-card": LovelaceCard;
  }
}

// TODO Add your configuration elements here for type-checking
export interface MagicContainerCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  show_warning?: boolean;
  show_error?: boolean;
  test_gui?: boolean;
  entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
