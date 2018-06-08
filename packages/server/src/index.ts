import { Server } from 'hapi'
import { RoutesPlugin } from './plugins/routes/routes.plugins'
import * as InertPlugin from 'inert'
import { distDir } from '@ks/web'

// create a server with a host and port
const server: Server = new Server({
  host: '0.0.0.0',
  port: 3000,
  router: {
    stripTrailingSlash: true
  },
  // init static file server - app files
  routes: {
    files: {
      relativeTo: distDir
    }
  },
  app: {}
})

async function start() {
  try {
    await server.register(InertPlugin)
    await server.register(RoutesPlugin)
    await server.start()
  }
  catch (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Server running at: ', server.info.uri)
}

start()

