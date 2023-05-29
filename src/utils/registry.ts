import { name, version } from "../../package.json";
import { ymString } from "./string";

let convertstring = new ymString();

export const magicapp = {
  name: convertstring.capitalize(name), // Magic
  prefix: name.toLowerCase(), // magic
  version: version,
  log: true,
  loglevel: 9 // 9 = DEBUG, 3 = INFO, 2 = WARNING, 1 = ERROR
};

interface cardData {
  name: string;
  description?: string;
  size?: number;
}

export function getCardData(carddata: cardData) {
  return {
    appdata: {
      name: magicapp.name,
      prefix: magicapp.prefix
    },
    register: {
      type: `${magicapp.prefix}-${carddata.name.toLowerCase()}-card`, // magic-<cardname>-card
      name: `${magicapp.name} ${convertstring.capitalize(carddata.name)} Card`, // Magic <Cardname> Card
      description:
        carddata.description ||
        "This card is part of the Magic Card selection.",
    },
    size: carddata.size || 1,
    editor: {
      type: `${carddata.name.toLowerCase()}-card-editor`, // <cardname>-card-editor
      prefixedtype: `${magicapp.prefix}-${carddata.name.toLowerCase()}-card-editor`, // magic-<cardname>-card-editor
      file: `./${carddata.name.toLowerCase()}-card-editor`, // ./<cardname>-card-editor
    },
  };
}
