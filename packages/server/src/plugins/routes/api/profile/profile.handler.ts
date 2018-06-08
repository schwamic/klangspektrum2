import * as Hapi from 'hapi'
import * as qs from 'qs'

export const ProfileHandler = {
  index: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const access_token = request.query['access_token']
    const cookie = request.state.data
    return h.response({'profile': cookie})
    // return h.response('token' + access_token)
  }
}
