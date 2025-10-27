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
export {
  ConsoleTransport,
  Logger
};
