import { bundle } from "./registry";

export function magiclogger(message: string){
  /* eslint no-console: 0 */
  console.log(
    `%c 🪄 ${bundle.name} 🪄 `  + `%c ${bundle.version} ` + ` ${message} `,
    "color: black; font-weight: bold; background: orange",
    "color: orange; font-weight: bold; background: black"
  )
}