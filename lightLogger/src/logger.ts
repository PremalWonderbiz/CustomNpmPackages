import { LogLevel, LEVELS } from "./levels";
import { Transport } from "./transports/console";

export interface LoggerOptions {
  level?: LogLevel;
  colorize?: boolean;
  transports?: Transport[];
}

export class Logger {
  private level: LogLevel;
  private transports: Transport[];

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'debug';
    this.transports = options.transports || [];
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVELS[level] >= LEVELS[this.level];
  }

  private log(level: LogLevel, message: string, meta?: any) {
    if (!this.shouldLog(level)) return;
    for (const transport of this.transports) {
      transport.log(level, message, meta);
    }
  }

  debug(msg: string, meta?: any) { this.log('debug', msg, meta); }
  info(msg: string, meta?: any) { this.log('info', msg, meta); }
  warn(msg: string, meta?: any) { this.log('warn', msg, meta); }
  error(msg: string, meta?: any) { this.log('error', msg, meta); }

  setLevel(level: LogLevel) { this.level = level; }
}
