import * as httpUtils from '../../../../utils/http-utils'
import { LoginHandler } from './login.handler'
import { ServerRoute } from 'hapi'

export const loginRoute: ServerRoute = {
  method: httpUtils.Methods.GET,
  path: '/api/login',
  handler: LoginHandler.index,
  options: {
    description:
      'Authorization Code Flow - Request to the Spotify Accounts service.',
    tags: ['api', 'Login'],
    state: {
      parse: true,
      failAction: 'error'
    }
  }
}

