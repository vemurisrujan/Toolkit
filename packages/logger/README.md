# @toolkit/logger

Small, typed logging library for Node.js written in TypeScript.

Features
- Lightweight Logger class with level filtering
- Console and file transports
- TypeScript types and build scripts

Installation

Install from your registry (example):

```pwsh
npm install @toolkit/logger
```

Usage

```ts
import { createLogger, fileTransport } from '@toolkit/logger';

const logger = createLogger({ level: 'debug' });
logger.info('Hello world');

// add file transport
logger.addTransport(fileTransport('./logs/app.log'));
logger.error('Oops', { code: 123 });
```

Build

From the package directory run:

```pwsh
npm install
# @toolkit/logger

**Lightweight, typed logging library for Node.js + TypeScript.**

A minimal but capable logger with level filtering, console and file transports, and full TypeScript support. Perfect for small-to-medium projects and monorepos.

## Features

- ✅ **Zero runtime dependencies** — only uses Node built-ins (`fs`, `path`)
- ✅ **Fully typed** — written in TypeScript with complete type exports
- ✅ **Multiple transports** — console, file, or custom (e.g., external services)
- ✅ **Log levels** — trace, debug, info, warn, error with filtering
- ✅ **Named loggers** — optional `name` field for source identification
- ✅ **Metadata support** — pass structured data alongside messages
- ✅ **CommonJS ready** — built as CommonJS for Node.js

## Quick Start

```bash
npm install @toolkit/logger
```

```typescript
import { createLogger, fileTransport } from '@toolkit/logger';

const logger = createLogger({ name: 'MyApp', level: 'debug' });
logger.info('Hello world');

// Add file logging
logger.addTransport(fileTransport('./logs/app.log'));
logger.error('Something went wrong', { code: 500 });
```

Output:
```
2025-12-04T10:30:45.123Z INFO [MyApp] Hello world
2025-12-04T10:30:45.124Z ERROR [MyApp] Something went wrong {"code":500}
```

**For more examples, see [EXAMPLES.md](./EXAMPLES.md)**

## API Reference

### `createLogger(options?: LoggerOptions): Logger`

Factory function to create a new logger instance.

```typescript
const logger = createLogger({
  name: 'MyApp',           // optional, used in formatted output
  level: 'debug',          // optional, min level to output (default: 'info')
  transports: [...]        // optional, initial transports
});
```

### `Logger` Class

#### Methods

- **`trace(msg: string, meta?: LogMeta)`** — log at `trace` level
- **`debug(msg: string, meta?: LogMeta)`** — log at `debug` level
- **`info(msg: string, meta?: LogMeta)`** — log at `info` level
- **`warn(msg: string, meta?: LogMeta)`** — log at `warn` level
- **`error(msg: string, meta?: LogMeta)`** — log at `error` level
- **`setLevel(level: LogLevel)`** — change minimum log level at runtime
- **`addTransport(transport: Transport)`** — add a transport

#### Log Levels (in order)

1. `trace` — most verbose
2. `debug`
3. `info` (default)
4. `warn`
5. `error` — least verbose

Only messages at or above the current level are logged.

### Built-in Transports

#### `consoleTransport`

Logs to `stdout` (info/debug/trace) or `stderr` (warn/error).

```typescript
import { consoleTransport, createLogger } from '@toolkit/logger';

const logger = createLogger({ transports: [consoleTransport] });
logger.info('To console');
```

#### `fileTransport(filePath: string): Transport`

Appends logs to a file. Creates parent directories if needed.

```typescript
import { fileTransport, createLogger } from '@toolkit/logger';

const logger = createLogger({
  transports: [fileTransport('./logs/app.log')]
});
logger.info('To file');
```

### Custom Transports

Implement the `Transport` interface to create a custom transport:

```typescript
import type { Transport } from '@toolkit/logger';

const myTransport: Transport = {
  log(level: LogLevel, message: string) {
    // Handle the formatted message however you want
    console.log(`[${level}] ${message}`);
  }
};

logger.addTransport(myTransport);
```

## Development

### Install & Build

From the package directory:

```bash
npm install
npm run build
```

Outputs compiled CommonJS and TypeScript declarations to `dist/`.

### Monorepo Development

From workspace root:

```bash
npm install
npm run --workspace=@toolkit/logger build
```

### Testing

To add tests, create a `test/` folder and configure your test runner (Jest, Vitest, etc.):

```bash
npm install -D jest @types/jest
# then add test script to package.json
```

## Publishing

```bash
npm publish --access public
```

## License

MIT

## See Also

- [EXAMPLES.md](./EXAMPLES.md) — detailed usage examples
