import { css } from "https://unpkg.com/lit@2.0.0/index.js?module";

export const editorStyles = css`
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
