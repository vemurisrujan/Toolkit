import * as fs from 'fs';
import * as path from "path";
import { LogLevel, LogMeta } from './types';

export interface Transport {
  log(level: LogLevel, message: string, meta?: LogMeta): void;
}

export const consoleTransport: Transport = {
  log(level, message, meta) {
    // message is expected to be pre-formatted by the Logger
    if (level === 'error' || level === 'warn') {
      console.error(String(message));
    } else {
      console.log(String(message));
    }
  }
};

export function fileTransport(filePath: string): Transport {
  const absolute = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  const dir = path.dirname(absolute);
  try { fs.mkdirSync(dir, { recursive: true }); } catch {}

  return {
    log(level, message, meta) {
      // message is expected to be pre-formatted by the Logger
      const line = `${String(message)}\n`;
      try {
        fs.appendFileSync(absolute, line, { encoding: 'utf8' });
      } catch (err) {
        // swallow write errors to avoid crashing host
        try { console.error('fileTransport write error', err); } catch {}
      }
    }
  };
}
