import { Server } from 'hapi'
import * as Inert from 'inert'
import * as Good from 'good'
import * as Crumb from 'crumb'

import { distDir } from '@ks/web'
import { RoutesPlugin } from './plugins/routes/routes.plugins'

// create a server with a host and port
const server: Server = new Server({
  host: '0.0.0.0',
  port: 3000,
  router: {
    stripTrailingSlash: true
  },
  // init static file server - static files
  routes: {
    files: {
      relativeTo: distDir
    }
  },
  app: {}
})


// todo https://futurestud.io/tutorials/learn-hapi-add-csrf-protection-on-forms-and-api-endpoints
async function start() {
  try {
    await server.register([
      Inert,
      // {
      //   plugin: Crumb,
      //   options: {
      //     cookieOptions: {
      //       isSecure: process.env.NODE_ENV === 'production'
      //     }
      //   }
      // },
      RoutesPlugin,
      {
        plugin: Good,
        options: {
          reporters: {
            myConsoleReporter: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{log: '*', response: '*', request: '*'}]
            }, {
              module: 'good-console'
            }, 'stdout']
          }
        }
      }
    ])
    await server.start()
  }
  catch (error) {
    server.log('error', error)
    process.exit(1)
  }
  server.log('info', 'Server running at: ' + server.info.uri)
}

start()
