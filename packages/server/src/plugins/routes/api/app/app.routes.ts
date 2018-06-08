import * as httpUtils from './../../../../utils/http-utils'
import { ServerRoute } from 'hapi'

// Serve all files from app/dist
export const AppRoute: ServerRoute = {
  method: httpUtils.Methods.GET,
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      lookupCompressed: true,
      index: true,
    },
  },
}
