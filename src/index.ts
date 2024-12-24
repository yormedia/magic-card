import { MagicCard } from "./magic-card";
import { MagicCardEditor } from "./magic-card-editor";

customElements.define("magic-card", MagicCard);
customElements.define("magic-card-editor", MagicCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "magic-card",
    name: "Magic Card",
    description: "A magical custom card with feature rows",
});
