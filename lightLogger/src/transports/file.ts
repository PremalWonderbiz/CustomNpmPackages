import { LogLevel } from "../levels";
import { Transport } from "./console";
import fs from "fs";

export class FileTransport implements Transport {
  constructor(private filePath: string) {}

  log(level: LogLevel, message: string, meta?: any) {
    const line = `[${level.toUpperCase()}] ${message}${meta ? " " + JSON.stringify(meta) : ""}\n`;
    fs.appendFileSync(this.filePath, line, { encoding: "utf8" });
  }
}
