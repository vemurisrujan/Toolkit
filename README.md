# ToolKit

A TypeScript monorepo containing reusable libraries and utilities for Node.js projects.

**Built with:**
- npm workspaces for unified dependency management
- TypeScript for type safety and better DX
- CommonJS for Node.js compatibility

## Packages

### [@toolkit/logger](./packages/logger)

Lightweight, typed logging library with support for multiple transports (console, file, custom) and log level filtering.

**Key features:**
- Zero runtime dependencies
- Fully typed TypeScript implementation
- Named loggers for source identification
- Support for structured metadata
- File and console transports built-in
- Extensible transport system

**Quick example:**
```typescript
import { createLogger, fileTransport } from '@toolkit/logger';

const logger = createLogger({ name: 'MyApp', level: 'debug' });
logger.info('App started');
logger.addTransport(fileTransport('./logs/app.log'));
logger.error('Something failed', { code: 500 });
```

See [@toolkit/logger README](./packages/logger/README.md) for full documentation.

## Getting Started

### Prerequisites

- Node.js 14+ (tested on Node 18+)
- npm 7+ (for workspace support)

### Installation

```bash
git clone <repo-url>
cd ToolKit
npm install
```

This installs all dependencies across the monorepo workspace.

### Building

Build all packages:

```bash
npm run build
```

Build a specific package:

```bash
npm run --workspace=@toolkit/logger build
```

Build with TypeScript directly:

```bash
npx tsc -p tsconfig.json
```

### Cleaning

Remove all compiled output:

```bash
npm run clean
```

## Development

### Project Structure

```
ToolKit/
├── packages/
│   └── logger/                 # @toolkit/logger package
│       ├── src/                # TypeScript source files
│       │   ├── logger.ts       # Core Logger class
│       │   ├── transports.ts   # Transport implementations
│       │   ├── types.ts        # Shared type definitions
│       │   └── index.ts        # Public exports
│       ├── dist/               # Compiled output (generated)
│       ├── package.json
│       ├── tsconfig.json
│       ├── README.md           # Package documentation
│       └── EXAMPLES.md         # Usage examples
├── tsconfig.json               # Root TypeScript config
├── package.json                # Root package manifest
└── README.md                   # This file
```

### TypeScript Configuration

The monorepo uses a **root `tsconfig.json`** that all packages extend. This ensures:
- Consistent compiler options across packages
- Centralized configuration management
- Per-package overrides where needed (e.g., `outDir`)

### Scripts

From the workspace root:

| Script | Purpose |
|--------|---------|
| `npm install` | Install dependencies for all packages |
| `npm run build` | Build all packages |
| `npm run build:ts` | Run TypeScript compiler on all sources |
| `npm run clean` | Remove all `dist/` folders |
| `npm run --workspace=<name> <script>` | Run script in a specific package |

### Adding a New Package

1. Create a folder under `packages/<name>`:
   ```bash
   mkdir packages/my-package
   cd packages/my-package
   ```

2. Add `package.json` with a unique name:
   ```json
   {
     "name": "@toolkit/my-package",
     "version": "0.1.0",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "scripts": {
       "build": "tsc -p tsconfig.json"
     }
   }
   ```

3. Add `tsconfig.json` extending the root config:
   ```json
   {
     "extends": "../../tsconfig.json",
     "compilerOptions": {
       "outDir": "dist",
       "rootDir": "src"
     },
     "include": ["src"]
   }
   ```

4. Create `src/index.ts` with your exports.

5. npm automatically links workspace packages when dependencies reference them.

## Contributing

When contributing to ToolKit:

1. Follow the existing code style (TypeScript strict mode enabled)
2. Add TypeScript types for all exports
3. Update package READMEs with new features
4. Ensure `npm run build` passes without errors
5. Test locally before submitting changes

## Versioning

Each package follows [Semantic Versioning](https://semver.org/). Update `version` in `package.json` when making changes.

## License

MIT

## Author

ShiftTiger-VSC

---

**Getting help?**

- Check individual package READMEs and EXAMPLES.md files for detailed usage
- Run `npm run --workspace=<package> build` to verify compilation
- Ensure TypeScript is installed: `npx tsc --version`
