# Copilot Instructions for ToolKit

## Project Overview

**ToolKit** is a monorepo built with npm workspaces (`package.json` with `workspaces` field pointing to `packages/*`). The project uses CommonJS modules and is configured as a private workspace.

## Architecture

### Monorepo Structure
- **Root `package.json`**: Defines workspace metadata, shared configuration, and centralized dependency management
- **`packages/*`**: Individual packages/modules that share dependencies through workspace linking
- **CommonJS modules**: Project uses `"type": "commonjs"` (not ESM)

### Key Setup
- **Author**: ShiftTiger-VSC
- **License**: MIT
- **Node Integration**: Use npm workspace commands (e.g., `npm run <script> --workspace=<pkg-name>`)

## Development Workflows

### Adding Packages
1. Create new folder under `packages/<package-name>`
2. Add `package.json` with unique name
3. npm automatically links workspace packages when you reference them as dependencies
4. Use relative paths or workspace dependency syntax: `"<workspace-pkg>": "*"`

### Commands
- **Root scripts**: Run from monorepo root
- **Workspace scripts**: Use `npm run <script> --workspace=<pkg-name>` to run in specific package
- **Testing**: Currently placeholder (`echo "Error: no test specified"`); implement per-package

## Critical Conventions

1. **Workspace Dependencies**: When one package depends on another, reference it via workspace version ("*") rather than semantic versioning
2. **CommonJS**: All code should use CommonJS (require/module.exports), not ES6 imports/exports
3. **Package Naming**: Each package under `packages/` must have a unique name in its `package.json`

## Integration Points

- **npm workspaces**: Central dependency management and consistent versioning across packages
- **Node modules**: All workspace packages share `node_modules` at root level
- **Cross-package references**: Import workspace packages as normal dependencies using their package names

## Next Steps When Adding Content

1. Define purpose for each package in `packages/<name>/package.json`
2. Establish clear interfaces/exports for each package
3. Document interdependencies in each package's README
4. Implement workspace-specific test commands before scaling

---
**Last updated**: December 4, 2025
