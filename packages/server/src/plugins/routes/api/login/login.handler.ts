import { Statuscodes } from '../../../../utils/http-utils'
import * as Hapi from 'hapi'
import * as qs from 'qs'

export const LoginHandler = {
  index: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const queryParams = {
      response_type: 'code',
      client_id: process.env.ks_client_id,
      redirect_uri: process.env.ks_redirect_uri,
      scope: 'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read user-top-read',
      state: Math.floor(Math.random() * 100000000),
      show_dialog: true
    }
    const redirectUrl = `https://accounts.spotify.com/authorize?${qs.stringify(queryParams)}`
    console.log(queryParams.state)
    h.state('data', {'spotify_auth_state': queryParams.state})
    return h.redirect(redirectUrl).code(Statuscodes.OK)
  }
}
