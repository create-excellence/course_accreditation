export function debug(message: string, ...optionalParams: any[]) {
  console.info(message, ...optionalParams)
}

export function info(message: string, ...optionalParams: any[]) {
  console.info(message, ...optionalParams)
}

export function warn(message?: any, ...optionalParams: any[]) {
  console.warn(message, ...optionalParams)
}

export function error(message: string, ...optionalParams: any[]) {
  console.error(message, ...optionalParams)
}

export function exception(message?: string, ...optionalParams: any[]) {
  console.exception(message, optionalParams)
}

export function trace(message?: string, ...optionalParams: any[]) {
  console.trace(message, optionalParams)
}
