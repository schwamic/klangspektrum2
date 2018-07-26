import { ServerRoute } from 'hapi'
import * as Joi from 'joi'

import * as httpUtils from './../../../../utils/http-utils'
import { AuthHandler } from './auth.handler'

export const authRoute: ServerRoute = {
  method: httpUtils.Methods.GET,
  path: '/api/auth',
  handler: AuthHandler.index,
  options: {
    description:
      'Authorization Code Flow - Request access and refresh tokens.',
    tags: ['api', 'Auth'],
    validate: {
      query: {
        code: Joi.string().default(null),
        error: Joi.string().default(null),
        state: Joi.required()
      }
    }
  }
}
