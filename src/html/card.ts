import { html } from "lit";

export class htmlCard {
    /**
     * @param title
     * @param components
     * @returns
     */
    base(title: string, components: string = "") {
        return html` <ha-card header="${title || ""}"> ${components} </ha-card> `;
    }

    row($row: {}) {
        return html` <div class="row">${Object.values($row).map((value) => html`<div>${value}</div>`)}</div>`;
    }
}
