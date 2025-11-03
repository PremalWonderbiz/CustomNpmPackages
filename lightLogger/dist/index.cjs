"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ConsoleTransport: () => ConsoleTransport,
  FileTransport: () => FileTransport,
  Logger: () => Logger
});
module.exports = __toCommonJS(index_exports);

// src/levels.ts
var LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 99
};

// src/logger.ts
var Logger = class {
  constructor(options = {}) {
    this.level = options.level || "debug";
    this.transports = options.transports || [];
  }
  shouldLog(level) {
    return LEVELS[level] >= LEVELS[this.level];
  }
  log(level, message, meta) {
    if (!this.shouldLog(level)) return;
    for (const transport of this.transports) {
      transport.log(level, message, meta);
    }
  }
  debug(msg, meta) {
    this.log("debug", msg, meta);
  }
  info(msg, meta) {
    this.log("info", msg, meta);
  }
  warn(msg, meta) {
    this.log("warn", msg, meta);
  }
  error(msg, meta) {
    this.log("error", msg, meta);
  }
  setLevel(level) {
    this.level = level;
  }
};

// src/transports/file.ts
var import_fs = __toESM(require("fs"), 1);
var FileTransport = class {
  constructor(filePath) {
    this.filePath = filePath;
  }
  log(level, message, meta) {
    const line = `[${level.toUpperCase()}] ${message}${meta ? " " + JSON.stringify(meta) : ""}
`;
    import_fs.default.appendFileSync(this.filePath, line, { encoding: "utf8" });
  }
};

// src/formatters.ts
var COLORS = {
  debug: "\x1B[36m",
  // cyan
  info: "\x1B[32m",
  // green
  warn: "\x1B[33m",
  // yellow
  error: "\x1B[31m",
  // red
  reset: "\x1B[0m"
};
function colorize(level, text, enable = true) {
  if (!enable || !COLORS[level]) return text;
  return `${COLORS[level]}${text}${COLORS.reset}`;
}
function timestamp() {
  return (/* @__PURE__ */ new Date()).toISOString();
}

// src/transports/console.ts
var ConsoleTransport = class {
  constructor(color = true) {
    this.color = color;
  }
  log(level, message, meta) {
    const time = timestamp();
    const msg = `[${time}] [${level.toUpperCase()}] ${message}`;
    console.log(colorize(level, msg, this.color));
    if (meta) console.log(meta);
  }
};

// src/index.ts
var logger = new Logger({
  transports: [new FileTransport("app.log")]
});
logger.debug("Debug message");
logger.info("Info message");
logger.warn("Warning message");
logger.error("Error message");
console.log("\u2705 FileTransport test complete. Check app.log for output.");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConsoleTransport,
  FileTransport,
  Logger
});
