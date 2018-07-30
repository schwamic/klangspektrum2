import { Plugin, Server, ServerOptions } from 'hapi'
import * as httpUtils from '../http-utils'

export const RouterPlugin: Plugin<any> = {
  name: 'RouterPlugin',
  register: async (server: Server, options: ServerOptions) => {

    // Serve static files
    server.route({
      method: httpUtils.Methods.GET,
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true,
          lookupCompressed: true
        }
      }
    })

    // Error 404 - return index.html
    server.ext('onPreResponse', (request: any, h: any) => {
      const response = request.response
      if (response.isBoom && response.output.statusCode === 404) {
        return h.file('index.html').code(httpUtils.Statuscodes.OK)
      }
      return h.continue
    })
    server.log('info', 'Plugin registered: Router')
  }
}
