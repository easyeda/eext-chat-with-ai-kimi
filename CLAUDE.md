# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JLCEDA/EasyEDA Pro extension that integrates Kimi AI (Moonshot API) for PCB/circuit design assistance. The extension runs within the JLCEDA Pro environment and provides:

-   AI-powered Q&A for circuit design
-   Component information lookup
-   Similar component recommendations
-   Netlist analysis
-   Vision-based circuit diagram analysis

## Build Commands

```bash
# Install dependencies (requires Node.js >= 20.5.0)
npm install

# Compile TypeScript to dist/
npm run compile

# Full build: compile + package as .eext extension
npm run build

# Format and lint all files
npm run fix
```

## Architecture

### Extension Entry Point

-   `src/index.ts` - Main extension entry, exports `activate()`, `about()`, and `RunChat()` functions
-   `extension.json` - Extension manifest defining menus, activation events, and metadata

### UI Layer

-   `iframe/index.html` - Complete chat interface (HTML + embedded JavaScript)
-   `iframe/style.css` - Styling for the chat interface

The UI is loaded via `eda.sys_IFrame.openIFrame()` and communicates with JLCEDA through the global `eda` API object.

### Build System

-   `config/esbuild.common.ts` - esbuild configuration (bundles to IIFE for browser)
-   `config/esbuild.prod.ts` - Production build script with watch mode support
-   `build/packaged.ts` - Packages dist + resources into `.eext` file using jszip

### Key Files

-   `.edaignore` - Lists files excluded from the final .eext package (similar to .gitignore)

## JLCEDA Extension API

The extension uses the `eda` global object provided by JLCEDA Pro:

-   `eda.sys_IFrame` - Open iframe panels
-   `eda.sys_Storage` - Persist user settings
-   `eda.sys_ClientUrl` - Make HTTP requests (for API calls)
-   `eda.sys_ToastMessage` / `eda.sys_MessageBox` - User notifications
-   `eda.sch_*` - Schematic-related APIs (netlist, component selection, events)

Type definitions are provided by `@jlceda/pro-api-types` package.

## Supported AI Models

The extension supports Moonshot/Kimi API models:

-   `kimi-k2-0905-preview`, `kimi-k2-turbo-preview` - Latest K2 models
-   `moonshot-v1-8k/32k/128k` - Text models (32k/128k support netlist analysis)
-   `moonshot-v1-*-vision-preview` - Vision models for circuit image analysis
