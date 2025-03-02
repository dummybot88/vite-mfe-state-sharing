# Vite React MFE Web Template

A starter template for setting up a **React** + **Vite** + **TypeScript** monorepo with **pnpm**.

---

## Table of Contents
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
- [Packages vs Apps](#packages-vs-apps)
- [Kickstart](#kickstart)
  - [Bootstrap](#bootstrap)
  - [Linting](#linting)
  - [Building the App](#building-the-app)
  - [Preview Mode](#preview-mode)
  - [Running the App](#running-the-app)
    - [Development Mode](#development-mode)
    - [Preview Mode](#preview-mode-1)
  - [Docker Setup](#docker-setup)
    - [Building Docker Image](#building-docker-image)
    - [Running Docker Container](#running-docker-container)
- [Vite Module Federation](#vite-module-federation)
  - [Remote Configuration](#remote-configuration)
  - [Host Configuration](#host-configuration)

---

## Setup

### Clone the Repository

Start by cloning this repository and removing its Git history to initialize a new project.

```bash
git clone https://github.com/dummybot88/vite-react-template.git my-app
cd my-app
rm -rf .git
git init
```

### Prerequisites

This template uses a **monorepo** structure managed by [pnpm](https://pnpm.io/), a fast and efficient dependency manager.

- All application code resides in the `apps` folder.
- Shared libraries are in the `packages` folder.

To get started, you will need to install the following tools on your machine:

- [Node.js](https://nodejs.org/en/download) (LTS version 18 or higher)
- [pnpm](https://pnpm.io/installation#using-npm)
- [Docker](https://www.docker.com/)

For local development, follow the steps outlined in the [Kickstart](#kickstart) section.

In the `web-app` package, you'll find an example component in `src/components/webApp` that demonstrates how to fetch data from the `api-simulator` package (a mock GraphQL API).

Now you're ready to start coding!

---

## Packages vs Apps

This project contains two main types of workspaces:

### Packages
These are reusable libraries intended for publishing to npm:
- **config**: Configuration files for the application.
- **logger**: Logging utilities.

### Apps
These are the executable applications:
- **api-simulator**: A mock backend-for-frontend (BFF) service using MSW and GraphQL.
- **web-app**: The micro frontend (MFE) application.

---

## Kickstart

> **Note**: All commands below should be run from the root of the project.

### Bootstrap Dependencies

Install dependencies for all workspaces and generate necessary mock files.

```bash
pnpm bootstrap
```

### Start the Application in Dev Mode

Run the `web-app` in development mode, including the mock backend services.

```bash
pnpm start:web-app:mock
```

---

## Linting

This repository uses the following linters:

- [ESLint](https://eslint.org/) for JavaScript/TypeScript
- [StyleLint](https://stylelint.io/) for CSS/SCSS

To lint all files in the project, run:

```bash
pnpm lint
```

---

## Building the App

To build the `web-app` and generate the necessary files for Docker:

```bash
pnpm build
```

---

## Running the Application

### Development Mode

Run the `web-app` in development mode with mock services like the API simulator.

```bash
pnpm start:web-app:mock
```

### Preview Mode

For testing federated modules locally, you need the `RemoteEntry.js` file generated by `vite build`. Since Vite's dev mode doesn't bundle files, you can use `vite build --watch` for hot updates. To serve the files from the `dist` directory:

```bash
pnpm preview:app
```

---

## Docker Setup

### Building the Docker Image

First, build the app using `pnpm build` to prepare the necessary files, then build the Docker image:

```bash
docker build -t <name>:<version> .
```

### Running the Docker Container

Run the Docker container locally, making sure to set any required environment variables.

```bash
docker run -d -p 4000:4000 <name>:<version>
```

To check if the app is running correctly inside the Docker container, visit:

```bash
http://localhost:4000/health
```

You should see `{"status": "UP"}` as a response.

---

## Vite Module Federation

[Vite Module Federation](https://vitejs.dev/) allows sharing code between different projects and dynamically loading modules at runtime, which is useful for micro-frontends and multi-app architectures.

### Remote Configuration

In the `vite.config.ts` file of the remote application, define the modules to expose:

```ts
import federation from "@originjs/vite-plugin-federation";

export default {
  plugins: [
    react(),
    svgr(),
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.tsx'
      },
      shared: ['react', 'react-dom', 'zustand', '@tanstack/react-query', 'axios']
    })
  ]
}
```

### Host Configuration

In the `vite.config.ts` file of the host application, specify the remote app to load:

```ts
import federation from "@originjs/vite-plugin-federation";

export default {
  plugins: [
    react(),
    svgr(),
    federation({
      name: 'host-app',
      filename: 'remoteEntry.js',
      exposes: {
        './secure': './src/store/secureStore.ts'
      },
      remotes: {
        remote_app: "http://localhost:5001/remoteEntry.js"
      },
      shared: ['react', 'react-dom', 'zustand', '@tanstack/react-query', 'axios']
    })
  ]
}
```