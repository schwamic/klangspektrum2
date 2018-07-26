import { Plugin, Server, ServerOptions } from 'hapi'
import { distDir } from '@ks/web'
import { api } from './api/index'
import { Statuscodes } from '../../utils/http-utils'

export const RoutesPlugin: Plugin<any> = {
  name: 'RoutesPlugin',
  register: async (server: Server, options: ServerOptions) => {
    // config server-cookies
    server.state('data', {
      ttl: null,
      isSecure: process.env.NODE_ENV === 'production',
      encoding: 'base64json',
      isSameSite: 'Lax',
    })

    // Init routes
    server.route(api)

    // APP - return index.html for everything else
    server.ext('onPreResponse', (request: any, h: any) => {
      const response = request.response
      if (response.isBoom &&
        response.output.statusCode === 404) {
        return h.file('index.html').code(Statuscodes.OK)
      }
      return h.continue
    })

    server.log('info', 'Plugin registered: Routes')
  }
}
