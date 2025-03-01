interface RemoteConfig {
  [key: string]: {
    remotePath: string
  }
}

interface Remotes {
  [mode: string]: RemoteConfig
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
  production: {}
}

export const config = {
  appName: 'remote',
  authMock: {
    port: 6000,
    url: 'http://localhost:6000',
    jwtFaker: {
      scriptTag:
        '<script>var exports = {"__esModule": true};</script>' +
        '<script src="/web/ppe-web-find-issues/src/mock/jwtFaker.js" type="text/javascript" defer></script>',
      setTokenHandler: '<body onload="fakeStoreJwtToken()">',
      removeTokenHandler: '<body onload="fakeClearJwtToken()">'
    }
  },
  auth: {
    authorisedRoles: [
      'ELS-GPO AWS PPE System Administrators',
      'ELS-GPO AWS PPE Non-Prod System Administrators',
      'ELS-GPO AWS PPE Journal Managers',
      'ELS-GPO AWS PPE Non-Prod Journal Managers'
    ]
  },
  bffMock: {
    port: 5001,
    url: 'http://localhost:5000',
    api: {
      path: '/'
    }
  },
  bff: {
    api: {
      contentType: 'application/json; charset=utf-8',
      path: '/services/ppe-graph-bff-remote/graphql'
    }
  },
  pact: {
    brokerUrl: 'https://pact-broker.ppe-np.elsevier.net/',
    consumerVersion: '1.0.0',
    bff: {
      consumerName: 'ppe-web-remote',
      providerName: 'ppe-graph-bff-remote',
      pactFolder: 'pacts',
      mockProvider: {
        api: {
          path: '/',
          matchers: {
            contentType: '(application\\/json; ?charset=(UTF|utf)-8)'
          }
        },
        log: {
          level: 'INFO',
          filename: 'logs/pact.log'
        },
        port: 8022,
        spec: 2,
        url: 'http://localhost:8022'
      }
    }
  },
  webApp: {
    port: 8081,
    path: '/web/ppe-web-remote',
    helpUrl: 'https://elsevier.atlassian.net/wiki/spaces/PPECOMMS/overview'
  }
}
