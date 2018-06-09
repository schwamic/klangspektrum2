import { ServerRoute } from 'hapi'
import * as httpUtils from './../../../../utils/http-utils'

/**
 * static-file-server: serve all files from static/dist
 * @type {{method: Methods.GET; path: string; handler: {directory: {path: string; redirectToSlash: boolean; lookupCompressed: boolean; index: boolean}}}}
 */
export const StaticRoute: ServerRoute = {
  method: httpUtils.Methods.GET,
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      lookupCompressed: true,
      index: true,
    },
  }
}
