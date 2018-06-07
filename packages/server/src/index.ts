import { Server } from 'hapi'
import { RoutesPlugin } from './plugins/routes/routes.plugins'

// create a server with a host and port
const server: Server = new Server({
  host: '0.0.0.0',
  port: 3000,
  app: {}
})

async function start() {
  try {
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
