import * as Hapi from 'hapi'

// create a server with a host and port
const server: Hapi.Server = new Hapi.Server({
    host: '0.0.0.0',
    port: 3000
})

server.route({
    method: 'GET',
    path: '/',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        return 'Hello World'
    }
})

async function start() {
    // start your server
    try {
        await server.start()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }

    console.log('Server running at: ', server.info.uri)
}

start()