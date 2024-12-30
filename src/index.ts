import { appInfo } from "./global/app";
export { MagicCard } from "./card/magic-card";

console.info(
    `%c 🪄 %c Magic Card %c v${appInfo.version}  `,
    "background-color: white;color: #fff;padding: 3px 2px 3px 3px;border-radius: 14px 0 0 14px;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)",
    "background-color: orange;color: white;padding: 3px 3px 3px 2px;border-radius: 0 0 0 0;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)",
    "background-color: black;color: white;padding: 3px 3px 3px 2px;border-radius: 0 14px 14px 0;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)"
);
