export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

export const LEVELS: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 99,
};
