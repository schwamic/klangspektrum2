import { Statuscodes } from '../../../../utils/http-utils'
import * as Hapi from 'hapi'

export const AuthHandler = {
  index: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {

    return h.response('Hello World').code(Statuscodes.OK)
  }
}
