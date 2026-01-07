# @mycompany/lightlogger

A **lightweight, minimal, pluggable logging library** for **Node.js and browser environments**, designed to be simple, dependency-free, and easy to reason about.

It supports **log levels**, **colorized console output**, **structured metadata**, and **file logging for Node.js only**.

---

## ✨ Key Features

- ✅ Multiple log levels: `debug`, `info`, `warn`, `error`, `silent`
- 🎨 Optional colorized console output
- 🧩 Pluggable transport architecture
- 🕒 ISO-8601 timestamps
- 📄 File logging (**Node.js only**)
- 🧠 Runtime log-level switching
- 📦 ESM + CJS builds
- 🔌 Zero runtime dependencies
- 🛡 Safe error serialization

---

## 📦 Installation

```bash
npm install @mycompany/lightlogger
```

---

## 🚀 Basic Usage

### Console logging (works in **Node.js and browser**)

```ts
import { Logger, ConsoleTransport } from "@mycompany/lightlogger";

const logger = new Logger({
  level: "debug",
  transports: [new ConsoleTransport(true)],
});

logger.info("Application started");
logger.warn("Low memory warning");
```

---

## 🔍 Log Levels

Available levels (in ascending severity):

```ts
debug < info < warn < error < silent;
```

### Example

```ts
const logger = new Logger({ level: "warn" });

logger.debug("Ignored");
logger.info("Ignored");
logger.warn("This will log");
logger.error("This will also log");
```

---

## 🧩 Transports Overview

Transports define **where logs go**.

| Transport          | Environment    | Purpose         |
| ------------------ | -------------- | --------------- |
| `ConsoleTransport` | Browser + Node | Console output  |
| `FileTransport`    | Node.js only   | File-based logs |

---

## 🖥 ConsoleTransport

### Import

```ts
import { ConsoleTransport } from "@mycompany/lightlogger";
```

### Usage

```ts
new ConsoleTransport(true); // colorized output
new ConsoleTransport(false); // plain output
```

### Output format

```
[2026-01-07T08:54:44.198Z] [INFO] Component mounted
```

### Notes

- ANSI colors are applied **only in console**
- Metadata is logged separately for readability
- Safe to use in **React, Vite, Next.js (client)**

---

## 📄 FileTransport (⚠ Node.js ONLY)

> **Important:** `FileTransport` uses Node’s `fs` module.
> It **must NOT be used in browser-based apps** (React, Vite, CRA, etc.).

### Import

```ts
import { FileTransport } from "@mycompany/lightlogger";
```

### Usage (Node.js / backend only)

```ts
const logger = new Logger({
  transports: [new FileTransport("./app.log")],
});

logger.info("Server started");
```

### File output example

```
[2026-01-07T08:54:44.198Z] [INFO] Server started {"port":3000}
```

### Why FileTransport does NOT work in browsers

- Browsers **do not have filesystem access**
- `fs.appendFileSync` is Node-only
- File logging is a **server responsibility**

✅ Correct pattern:

```
Browser → API → Node.js → FileTransport
```

---

## 🧠 Using Multiple Transports

```ts
const logger = new Logger({
  level: "debug",
  transports: [
    new ConsoleTransport(true),
    new FileTransport("./logs/app.log"), // Node.js only
  ],
});
```

---

## 📎 Logging Metadata

You can pass metadata with any log call.

```ts
logger.info("User logged in", {
  userId: 42,
  role: "admin",
});
```

### Console output

```
[INFO] User logged in
{ userId: 42, role: "admin" }
```

### File output

```
[INFO] User logged in {"userId":42,"role":"admin"}
```

---

## ❗ Logging Errors (Important)

JavaScript `Error` objects **cannot be JSON-stringified directly**.

This library **automatically serializes error metadata** when using `logger.error`.

### Example

```ts
try {
  throw new Error("Database connection failed");
} catch (err) {
  logger.error("Request failed", err);
}
```

### File / structured output

```json
{
  "name": "Error",
  "message": "Database connection failed",
  "stack": "Error: Database connection failed ..."
}
```

✔ No `{}`
✔ Stack trace preserved
✔ Safe for files and APIs

---

## 🔄 Change Log Level at Runtime

```ts
logger.setLevel("error");

logger.warn("Ignored");
logger.error("Logged");
```

---

## 🔕 Silent Mode

Disable all logs without removing code.

```ts
const logger = new Logger({ level: "silent" });
```

---

## 🛠 Creating a Custom Transport

Implement the `Transport` interface:

```ts
import { Transport, LogLevel } from "@mycompany/lightlogger";

class HttpTransport implements Transport {
  log(level: LogLevel, message: string, meta?: any) {
    fetch("/api/logs", {
      method: "POST",
      body: JSON.stringify({ level, message, meta }),
    });
  }
}
```

```ts
new Logger({
  transports: [new HttpTransport()],
});
```

---

## 🧪 Testing

```bash
npm test
```

Test coverage includes:

- log-level filtering
- console formatting
- file output
- metadata handling
- error serialization

---

## 📁 Public Exports

```ts
Logger;
LoggerOptions;
LogLevel;
Transport;
ConsoleTransport;
FileTransport;
```

---

## 📌 Recommended Use Cases

- Backend services (Node.js)
- API logging
- CLI tools
- Microservices
- Frontend console logging
- Learning / custom logging pipelines

---

## ⚠ Environment Summary

| Environment            | ConsoleTransport | FileTransport |
| ---------------------- | ---------------- | ------------- |
| Node.js                | ✅               | ✅            |
| React / Browser        | ✅               | ❌            |
| Next.js (client)       | ✅               | ❌            |
| Next.js (server / API) | ✅               | ✅            |
| Electron               | ✅               | ✅            |

---

### ✅ Final Notes

- Console logs may be colorized
- File logs are **always plain text**
- Errors are safely serialized
- File logging is **Node-only by design**
