import * as fs from "fs";
import { timestamp } from "../formatters";
import { LogLevel } from "../levels";
import { Transport } from "./console";

export class FileTransport implements Transport {
  constructor(private filePath: string, private isColorized: boolean = true) {}

  log(level: LogLevel, message: string, meta?: any) {
    const time = timestamp();
    const msg = `[${time}] [${level.toUpperCase()}] ${message}`;
    const line = `${msg} ${meta ? " " + JSON.stringify(meta) : ""}\n`;
    fs.appendFileSync(this.filePath, line, { encoding: "utf8" });
  }
}
