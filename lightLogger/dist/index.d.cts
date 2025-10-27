type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

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
    colorize?: boolean;
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

export { ConsoleTransport, type LogLevel, Logger, type LoggerOptions };
