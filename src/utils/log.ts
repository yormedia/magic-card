import { bundle } from "./registry";

export function magiclogger(level: number, message: string){
  /* eslint no-console: 0 */
    let logDate = new Date()
    let logDateString =  ("0" + logDate.getDate()).slice(-2) + "-" + ("0"+(logDate.getMonth()+1)).slice(-2) + "-" +
    logDate.getFullYear() + " " + ("0" + logDate.getHours()).slice(-2) + ":" + ("0" + logDate.getMinutes()).slice(-2) + ("0" + logDate.getSeconds()).slice(-2)
    if (!bundle.log) { return false}

    if (bundle.loglevel <= level) {
      console.log(
        `%c 🪄 ${bundle.name} 🪄 %c ${bundle.version} %c ${level}:\t${logDateString}\t${message} `,
        "color: black; font-weight: bold; background: orange",
        "color: orange; font-weight: bold; background: black",
        "color: white; font-weight: bold; background: transparent"
      )
    }
    return true
}