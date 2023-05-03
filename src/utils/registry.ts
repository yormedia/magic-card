import { name, version } from "../../package.json";
import { ymString } from "./string";

let convertstring = new ymString();

export const bundle = {
  name: convertstring.capitalize(name), // Magic
  prefix: name.toLowerCase(), // magic
  version: version,
};

interface cardData {
  name: string;
  description?: string;
  size?: number;
}

export function getCardData(carddata: cardData) {
  return {
    register: {
      type: `${bundle.prefix}-${carddata.name.toLowerCase()}-card`, // magic-<cardtype>-card
      name: `${bundle.name} ${convertstring.capitalize(carddata.name)} Card`, // Magic <Cardname> Card
      description:
        carddata.description ||
        "This card is part of the Magic Card selection.",
    },
    size: carddata.size || 1,
    editor: {
      type: `${carddata.name.toLowerCase()}-card-editor`, // <cardtype>-card-editor
      prefixedtype: `${
        bundle.prefix
      }-${carddata.name.toLowerCase()}-card-editor`, // magic-<cardtype>-card-editor
      file: `./${carddata.name.toLowerCase()}-card-editor`, // ./<cardtype>-card-editor
    },
  };
}
