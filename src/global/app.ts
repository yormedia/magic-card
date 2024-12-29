// import { name, version } from "../../package.json";
import { capitalize } from "../functions/string";

export const appInfo = {
    name: "Magic", //capitalize(name),
    prefix: "magic", //name.toLowerCase(),
    version: "1.0.0b1", //version,
};

export function getCardData(cardType: string = "") {
    let cardName = cardType === "" ? appInfo.name : `${appInfo.name} ` + capitalize(cardType);
    let cardPrefix = cardType === "" ? appInfo.prefix : `${appInfo.prefix}-` + capitalize(cardType);
    return {
        type: `${cardPrefix}-card`,
        name: `${cardName} Card`,
        description: "",
        editor: {
            type: `${cardPrefix}-card-editor`,
            file: `./${cardPrefix}-card-editor`,
        },
    };
}
