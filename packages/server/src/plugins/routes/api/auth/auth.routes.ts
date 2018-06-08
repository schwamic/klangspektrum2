import * as httpUtils from './../../../../utils/http-utils'
import { AuthHandler } from './auth.handler'
import { ServerRoute } from 'hapi'
import * as Joi from 'joi'


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
        code: Joi.required(),
        state: Joi.required()
      }
    }
  }
}
