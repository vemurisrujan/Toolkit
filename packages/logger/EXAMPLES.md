# @toolkit/logger Examples

## Basic Usage

```typescript
import { createLogger } from '@toolkit/logger';

const logger = createLogger({ level: 'info' });
logger.info('Application started');
logger.debug('Debug message (not shown at info level)');
logger.warn('Warning message');
logger.error('Error occurred', { code: 500 });
```

Output:
```
2025-12-04T10:30:45.123Z INFO  Application started
2025-12-04T10:30:45.124Z WARN  Warning message
2025-12-04T10:30:45.125Z ERROR  Error occurred {"code":500}
```

## Named Logger

```typescript
import { createLogger } from '@toolkit/logger';

const logger = createLogger({ name: 'MyApp', level: 'debug' });
logger.info('Server initialized');
logger.debug('Config loaded');
```

Output:
```
2025-12-04T10:30:45.123Z INFO [MyApp] Server initialized
2025-12-04T10:30:45.124Z DEBUG [MyApp] Config loaded
```

## Multiple Transports

```typescript
import { createLogger, fileTransport } from '@toolkit/logger';

const logger = createLogger({
  name: 'API',
  level: 'debug',
  transports: []  // start with no transports
});

logger.addTransport(consoleTransport);  // logs to console
logger.addTransport(fileTransport('./logs/api.log'));  // logs to file

logger.info('Request received');
logger.error('Database error', { err: 'Connection timeout' });
```

Both console and file will receive the same formatted messages.

## File Transport

```typescript
import { createLogger, fileTransport } from '@toolkit/logger';

const logger = createLogger({
  level: 'info',
  transports: [fileTransport('./logs/app.log')]
});

logger.info('Server started');
logger.error('Fatal error');
```

The `fileTransport` automatically creates directories if they don't exist.

## Log Levels

Available levels (in order of verbosity):
- `trace` — most verbose, for detailed debugging
- `debug` — debugging information
- `info` — informational messages (default level)
- `warn` — warning messages
- `error` — error messages (least verbose)

```typescript
const logger = createLogger({ level: 'warn' });
logger.trace('trace');   // not shown
logger.debug('debug');   // not shown
logger.info('info');     // not shown
logger.warn('warn');     // shown
logger.error('error');   // shown
```

## Changing Log Level at Runtime

```typescript
const logger = createLogger({ level: 'info' });
logger.info('Initial message');  // shown

logger.setLevel('debug');
logger.debug('Debug after change');  // now shown
```

## Metadata with Logs

```typescript
const logger = createLogger();

logger.info('User login', { userId: 42, email: 'user@example.com' });
logger.error('API request failed', { statusCode: 500, retries: 3 });
```

Output:
```
2025-12-04T10:30:45.123Z INFO User login {"userId":42,"email":"user@example.com"}
2025-12-04T10:30:45.124Z ERROR API request failed {"statusCode":500,"retries":3}
```

## Custom Transport

```typescript
import { createLogger } from '@toolkit/logger';
import type { Transport } from '@toolkit/logger';

const customTransport: Transport = {
  log(level, message) {
    // Send to external logging service
    fetch('https://logs.example.com/log', {
      method: 'POST',
      body: JSON.stringify({ level, message, timestamp: new Date() })
    });
  }
};

const logger = createLogger();
logger.addTransport(customTransport);
logger.info('Event logged to external service');
```
