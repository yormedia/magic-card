import { bundle } from "./registry";

export function magiclogger(level: number, message: string){
  /* eslint no-console: 0 */
    let logDate = new Date()
    let logDateString =  ("0" + logDate.getDate()).slice(-2) + "-" + ("0"+(logDate.getMonth()+1)).slice(-2) + "-" +
    logDate.getFullYear() + " " + ("0" + logDate.getHours()).slice(-2) + ":" + ("0" + logDate.getMinutes()).slice(-2) + ("0" + logDate.getSeconds()).slice(-2)
    let loglevel
    let logColor
    if (!bundle.log) { return false}
    switch (level) {
      case 9:
        loglevel = "DEBUG";
        break;
      case 3:
        loglevel = "INFO";
        break;
      case 2:
        loglevel = "WARNING";
        break;
      case 1:
        loglevel = "ERROR";
        break;
    }
    
    if (level === 9) { logColor = "color: green; font-weight: bold; background: transparent" }
    if (level === 3) { logColor = "color: white; font-weight: bold; background: transparent" }
    if (level === 2) { logColor = "color: orange; font-weight: bold; background: transparent" }
    if (level === 1) { logColor = "color: red; font-weight: bold; background: transparent" }
    if (bundle.loglevel <= level) {

      console.log(
        `%c 🪄 ${bundle.name} 🪄 %c ${bundle.version} %c ${level}:\t %c ${logDateString}\t${message} `,
        "color: black; font-weight: bold; background: orange",
        "color: orange; font-weight: bold; background: black",
        logColor
      )
    }
    return true
}