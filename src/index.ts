import { appInfo } from "./global/app";
export { MagicCard } from "./card/magic-card";

// console.info(`%c 🪄 ${appInfo.name} 🪄 %c ${appInfo.version}`, "color: black; font-weight: bold; background: orange");
// console.info(
//     `%c 🪄 %c ${appInfo.name}                    %c %c ${appInfo.version} `,
//     '@import url("https://fonts.googleapis.com/css2?family=Roboto");background-color:#FFFFFF;color:#000000;padding:3px 43px 2px 8px;border-radius:999vh;border:5px solid #1FBEF2;font-family:"Roboto", sans-serif;margin-top:18px',
//     '@import url("https://fonts.googleapis.com/css2?family=Roboto");background-color:#FFFFFF;color:#1FBEF2;padding:3px 8px 2px 0;border-radius:0;border:0;font-family:"Roboto", sans-serif;margin-left:-94px',
//     '@import url("https://fonts.googleapis.com/css2?family=Roboto");background-color:#FFFFFF;color:#1FBEF2;padding:3px 8px 2px 0;border-radius:999vh 0 0 999vh;border:0;font-family:"Roboto", sans-serif;margin-left:-94px',
//     '@import url("https://fonts.googleapis.com/css2?family=Roboto");background-color:#FFFFFF;color:#1FBEF2;padding:3px 9px 2px 0;border-radius:0 999vh 999vh 0;border:0;font-family:"Roboto", sans-serif;margin-left:-1px;margin-bottom:18px'
// );
console.info(
    `%c 🪄 %c Magic Card %c v${appInfo.version}  `,
    "background-color: white;color: #fff;padding: 3px 2px 3px 3px;border-radius: 14px 0 0 14px;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)",
    "background-color: orange;color: white;padding: 3px 3px 3px 2px;border-radius: 0 0 0 0;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)",
    "background-color: black;color: white;padding: 3px 3px 3px 2px;border-radius: 0 14px 14px 0;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)"
);
