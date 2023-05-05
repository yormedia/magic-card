import { TabBase } from '@material/mwc-tab/mwc-tab-base.js';
import { NotchedOutlineBase } from '@material/mwc-notched-outline/mwc-notched-outline-base.js';

import { styles as tabStyles } from '@material/mwc-tab/mwc-tab.css';
import { styles as notchedOutlineStyles } from '@material/mwc-notched-outline/mwc-notched-outline.css';

export const tabDefinition = {
  'mwc-tab': class extends TabBase {
    static get styles() {
      return tabStyles;
    }
  },
  'mwc-notched-outline': class extends NotchedOutlineBase {
    static get styles() {
      return notchedOutlineStyles;
    }
  },
};
