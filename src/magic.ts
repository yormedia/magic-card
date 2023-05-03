import { bundle } from "./utils/registry";

export { MagicContainerCard } from "./cards/container/container-card";
// export { MagicSectionCard } from "./cards/section-card/section-card";

/* eslint no-console: 0 */
console.info(
  `%c 🪄 ${bundle.name} 🪄 %c ${bundle.version}`,
  "color: black; font-weight: bold; background: orange"
);
