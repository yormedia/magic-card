import { magicapp } from "./utils/registry";

export { MagicContainerCard } from "./cards/container/container-card";
// export { MagicSectionCard } from "./cards/section-card/section-card";

/* eslint no-console: 0 */
console.info(
  `%c 🪄 ${magicapp.name} 🪄 %c ${magicapp.version} %c is installed.`,
  "color: black; font-weight: bold; background: orange",
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: transparent"
);
