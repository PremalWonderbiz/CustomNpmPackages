type LogLevel = "debug" | "info" | "warn" | "error" | "silent";

interface Transport {
    log(level: LogLevel, message: string, meta?: any): void;
}
declare class ConsoleTransport implements Transport {
    private color;
    constructor(color?: boolean);
    log(level: LogLevel, message: string, meta?: any): void;
}

interface LoggerOptions {
    level?: LogLevel;
    transports?: Transport[];
}
declare class Logger {
    private level;
    private transports;
    constructor(options?: LoggerOptions);
    private shouldLog;
    private log;
    debug(msg: string, meta?: any): void;
    info(msg: string, meta?: any): void;
    warn(msg: string, meta?: any): void;
    error(msg: string, meta?: any): void;
    setLevel(level: LogLevel): void;
}

declare class FileTransport implements Transport {
    private filePath;
    private isColorized;
    constructor(filePath: string, isColorized?: boolean);
    log(level: LogLevel, message: string, meta?: any): void;
}

export { ConsoleTransport, FileTransport, type LogLevel, Logger, type LoggerOptions, type Transport };
