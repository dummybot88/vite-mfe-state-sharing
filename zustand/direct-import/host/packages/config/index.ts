interface RemoteConfig {
  [key: string]: {
    remotePath: string;
  };
}

interface Remotes {
  [mode: string]: RemoteConfig;
}

/**
 *
 * Configuration for the remotes that the application will consume
 *
 * @type {Remotes}
 *
 * @example
 * // Configuration
 * development: {
 *  mfe: {
 *   remotePath: 'http://localhost:8083/dist/assets/remoteEntry.js'
 *  }
 * }
 * // Usage
 * In `vite.config.ts` file, federate the remote
 * federation({
 *  ...,
 *  remotes: {
 *    'remotes/mfe': remotes[mode]?.['mfe']?.remotePath
 *  }
 *  ...
 * })
 *
 *
 */
export const remotes: Remotes = {
  development: {},
  preview: {},
  production: {},
};

export const config = {
  appName: "host",
  webApp: {
    port: 8080,
    path: "/web/host",
  },
};
