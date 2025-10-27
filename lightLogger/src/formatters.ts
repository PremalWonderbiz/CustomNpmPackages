export const COLORS: Record<string, string> = {
  debug: "\x1b[36m", // cyan
  info: "\x1b[32m", // green
  warn: "\x1b[33m", // yellow
  error: "\x1b[31m", // red
  reset: "\x1b[0m",
};

export function colorize(level: string, text: string, enable:boolean = true): string {
    if (!enable || !COLORS[level]) return text;
    return `${COLORS[level]}${text}${COLORS.reset}`;
}

export function timestamp() : string {
    return new Date().toISOString();
}