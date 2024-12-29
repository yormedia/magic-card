import { css } from "lit";

export const cardStyles = css`
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
