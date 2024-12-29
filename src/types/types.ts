import { LovelaceCardConfig, ActionConfig } from "custom-card-helpers";
export interface MagicCardConfig {
    entity?: string;
    title?: string;
    show: ShowConfig;
    test_gui?: boolean;
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
}

export interface FeatureConfig {
    name: string;
    entity_id: string;
    service: string;
    show_state: boolean;
    service_data?: Record<string, any>;
}

export interface ShowConfig {
    name: boolean;
    state: boolean;
}
