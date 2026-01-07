import { colorize, timestamp } from "../formatters";
import { LogLevel } from "../levels";

export interface Transport {
  log(level: LogLevel, message: string, meta?: any): void;
}

export class ConsoleTransport implements Transport {
  constructor(private color: boolean = true) {}

  log(level: LogLevel, message: string, meta?: any) {
    const time = timestamp();
    const msg = `[${time}] [${level.toUpperCase()}] ${message}`;
    console.log(colorize(level, msg, this.color));
    if (meta) console.log(meta);
  }
}
