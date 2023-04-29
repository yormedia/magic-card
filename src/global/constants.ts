import { name, version } from "../../package.json";
import {capitalize} from "../functions/string";

export const bundle = {
    name: capitalize(name),             // Magic
    prefix: name.toLowerCase(),         // magic
    version: version
};

export function getCardData(cardType: string) {
    return {
        // magic-<cardtype>-card
        type: `${bundle.prefix}-${cardType.toLowerCase()}-card`,
        // Magic <Cardname> Card
        name: `${bundle.name} ${capitalize(cardType)} Card`,
        description: '',
        editor: {
            // <cardtype>-card-editor
            type: `${cardType.toLowerCase()}-card-editor`,
            // magic-<cardtype>-card-editor
            prefixedtype: `${bundle.prefix}-${cardType.toLowerCase()}-card-editor`,
            // ./<cardtype>-card-editor
            file: `./${cardType.toLowerCase()}-card-editor`
        }
    };
}