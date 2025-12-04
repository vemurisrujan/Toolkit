import { Transport, consoleTransport } from './transports';
import { LogLevel, LogMeta } from './types';

const levelOrder: LogLevel[] = ["trace", "debug", "info", "warn", "error"];

const levelPriority: Record<LogLevel, number> = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
};

export interface LoggerOptions {
  name?: string;
  level?: LogLevel;
  transports?: Transport[];
}

function shouldLog(current: LogLevel, incoming: LogLevel) {
  return levelOrder.indexOf(incoming) >= levelOrder.indexOf(current);
}

export class Logger {
  private name?: string;
  private level: LogLevel;
  private transports: Transport[];

  constructor(options: LoggerOptions = {}) {
    this.name = options.name;
    this.level = options.level ?? 'info';
    this.transports = options.transports ?? [consoleTransport];
  }

   private formatMessage(level: LogLevel, msg: unknown, meta?: LogMeta) {
    const prefix = this.name ? `[${this.name}]` : "";
    const ts = new Date().toISOString();
    const base = `${ts} ${level.toUpperCase()} ${prefix} ${String(msg)}`.trim();
    if (!meta || Object.keys(meta).length === 0) return base;
    try {
      return `${base} ${JSON.stringify(meta)}`;
    } catch {
      return base;
    }
  }

  setLevel(level: LogLevel) {
    this.level = level;
  }

  addTransport(t: Transport) {
    this.transports.push(t);
  }

  log(level: LogLevel, message: string, meta?: LogMeta) {
    if (!shouldLog(this.level, level)) return;

    const formatted = this.formatMessage(level, message, meta);

    for (const t of this.transports) {
      try {
        t.log(level, formatted);
      } catch (err) {
        // Best-effort: do not throw from logger
        try {
          console.error('Logger transport error', err);
        } catch {}
      }
    }
  }

  trace(msg: string, meta?: LogMeta) {
    this.log('trace', msg, meta);
  }
  debug(msg: string, meta?: LogMeta) {
    this.log('debug', msg, meta);
  }
  info(msg: string, meta?: LogMeta) {
    this.log('info', msg, meta);
  }
  warn(msg: string, meta?: LogMeta) {
    this.log('warn', msg, meta);
  }
  error(msg: string, meta?: LogMeta) {
    this.log('error', msg, meta);
  }
}

export function createLogger(options?: LoggerOptions) {
  return new Logger(options);
}
