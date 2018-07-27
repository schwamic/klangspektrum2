import { Server } from 'hapi'
import * as Inert from 'inert' // serving static files
// import * as Good from 'good' // logger

import { distDir } from '@ks/web'

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

async function start() {
  try {
    await server.register([
      Inert,
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

// todo serve angular-app
