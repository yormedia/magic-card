export interface MagicCardConfig {
  title?: string;
  entity: string;
  show_name: boolean;
  show_state: boolean;
  features: FeatureConfig[];
}

export interface FeatureConfig {
  name: string;
  entity_id: string;
  service: string;
  show_state: boolean;
  service_data?: Record<string, any>;
}