import { api } from './api/index'
import { Plugin, Server, ServerOptions } from 'hapi'

export const RoutesPlugin: Plugin<any> = {
  name: 'RoutesPlugin',
  register: async (server: Server, options: ServerOptions) => {
    // config server-cookies
    server.state('data', {
      ttl: null,
      isSecure: true,
      isHttpOnly: true,
      encoding: 'base64json',
      clearInvalid: false, // remove invalid cookies
      strictHeader: true // don't allow violations of RFC 6265
    })
    server.route(api)
  }
}
