import { Server } from 'hapi'
import * as Inert from 'inert'
import * as Good from 'good'
import { distDir } from '@ks/web'
import { RouterPlugin } from './plugins/router.plugin'

// create server
const server: Server = new Server({
  host: '0.0.0.0',
  port: 3000,
  router: {
    stripTrailingSlash: false
  },
  // set root directory for static files
  routes: {
    files: {
      relativeTo: distDir
    }
  },
  app: {}
})

async function liftOff() {
  try {
    await server.register([
      Inert,
      RouterPlugin,
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

liftOff()
