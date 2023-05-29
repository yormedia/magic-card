import { magicapp } from "./registry";

export function magiclogger(level: number, message: string){
  /* eslint no-console: 0 */
    let logDate = new Date()
    let logDateString =  ("0" + logDate.getDate()).slice(-2) + "-" + ("0" + (logDate.getMonth()+1)).slice(-2) + "-" + logDate.getFullYear() + " " + 
      ("0" + logDate.getHours()).slice(-2) + ":" + ("0" + logDate.getMinutes()).slice(-2) + "." + ("0" + logDate.getSeconds()).slice(-2)
    let loglevel = "#######"
    let logColor
    if (!magicapp.log) { return false}
    
    if (level === 9) { loglevel.replace("#######", "DEBUG  ") }
    if (level === 3) { loglevel.replace("#######", "INFO   ") }
    if (level === 2) { loglevel.replace("#######", "WARNING") }
    if (level === 1) { loglevel.replace("#######", "ERROR  ") }
    
    if (level === 9) { logColor = "color: green; font-weight: bold; background: transparent" }
    if (level === 3) { logColor = "color: white; font-weight: bold; background: transparent" }
    if (level === 2) { logColor = "color: orange; font-weight: bold; background: transparent" }
    if (level === 1) { logColor = "color: red; font-weight: bold; background: transparent" }

    if (magicapp.loglevel >= level) {

      console.log(
        `%c 🪄 ${magicapp.name} 🪄 %c ${magicapp.version} %c ${loglevel}: %c \t${logDateString}\t${message} `,
        "color: black; font-weight: bold; background: orange",
        "color: orange; font-weight: bold; background: black",
        logColor,
        "color: white; font-weight: bold; background: transparent"
      )
    }
    return true
}