import { TabBarBase } from '@material/mwc-tab-bar/mwc-tab-bar-base.js';
import { NotchedOutlineBase } from '@material/mwc-notched-outline/mwc-notched-outline-base.js';

import { styles as tabbarStyles } from '@material/mwc-tab-bar/mwc-tab-bar.css';
import { styles as notchedOutlineStyles } from '@material/mwc-notched-outline/mwc-notched-outline.css';

export const tabbarDefinition = {
  'mwc-tab': class extends TabBarBase {
    static get styles() {
      return tabbarStyles;
    }
  },
  'mwc-notched-outline': class extends NotchedOutlineBase {
    static get styles() {
      return notchedOutlineStyles;
    }
  },
};
