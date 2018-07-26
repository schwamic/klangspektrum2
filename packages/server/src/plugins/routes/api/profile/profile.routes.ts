import * as httpUtils from '../../../../utils/http-utils'
import { ProfileHandler } from './profile.handler'
import { ServerRoute } from 'hapi'
import * as Joi from 'joi'
/**
 * fetch a valid crumb token
 * @type {{method: Methods.GET; path: string; handler: (request, h) => {crumb: any}; options: {description: string; tags: string[]; state: {parse: boolean; failAction: "error"}}}}
 */
export const profileRouteCSRF: ServerRoute = {
  method: httpUtils.Methods.GET,
  path: '/api/profile',
  handler: function (request, h) {
    return {
      // @ts-ignore
      crumb: request.server.plugins.crumb.generate(request, h)
    };
  },
  options: {
    // plugins: {
    //   crumb: {
    //     restful: true
    //   }
    // },
    description:
      'Load csrf token',
    tags: ['api', 'ProfileCSRF']
  }
}

/**
 * Serve spotify-profile
 * @type {{method: Methods.POST; path: string; handler: (request: Request, h: ResponseToolkit) => Promise<{profile: any}>; options: {plugins: {crumb: {restful: boolean}}; description: string; tags: string[]; state: {parse: boolean; failAction: "error"}}}}
 */
export const profileRoute: ServerRoute = {
  method: httpUtils.Methods.POST,
  path: '/api/profile',
  handler: ProfileHandler.index,
  options: {
    // plugins: {
    //   crumb: {
    //     restful: true,
    //     autoGenerate: false
    //   }
    // },
    description:
      'Load data from user',
    tags: ['api', 'Profile'],
    validate: {
      payload: {
        token: Joi.string().required(),
        user: Joi.string().required()
      }
    },
  }
}

