import { isDebugEnable } from '@/debugEnable.js'

function createLogger(level = 'info') {
  const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
  const levelIndex = levels.indexOf(level)

  const levelColors = {
    trace: 'color: gray',
    debug: 'color: blue',
    info: 'color: green',
    warn: 'color: orange',
    error: 'color: red',
    fatal: 'color: magenta'
  }

  const logMethod = (method, ...args) => {
    if (levels.indexOf(method) >= levelIndex) {
      const color = levelColors[method]
      console.log(`%c[${method.toUpperCase()}]%c`, color, '', ...args)
    }
  }

  return {
    trace: (...args) => logMethod('trace', ...args),
    debug: (...args) => logMethod('debug', ...args),
    info: (...args) => logMethod('info', ...args),
    warn: (...args) => logMethod('warn', ...args),
    error: (...args) => logMethod('error', ...args),
    fatal: (...args) => logMethod('fatal', ...args)
  }
}

export const logger = createLogger(isDebugEnable ? 'debug' : 'info')

if (0 === 1) {
  logger.info('This is an info message') // 绿色
  logger.warn('This is a warning') // 橙色
  logger.error('This is an error message') // 红色
  logger.debug('This is a debug message') // 蓝色
  logger.trace('This is a trace message') // 灰色
}
