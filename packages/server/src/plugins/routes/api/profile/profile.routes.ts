import * as httpUtils from '../../../../utils/http-utils'
import { ProfileHandler } from './profile.handler'
import { ServerRoute } from 'hapi'

export const profileRoute: ServerRoute = {
  method: httpUtils.Methods.GET,
  path: '/api/profile',
  handler: ProfileHandler.index,
  options: {
    description:
      'Load data from user',
    tags: ['api', 'Profile'],
    state: {
      parse: true,
      failAction: 'error'
    }
  }
}

