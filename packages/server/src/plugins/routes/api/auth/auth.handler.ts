import * as Hapi from 'hapi'
import axios, { AxiosRequestConfig } from 'axios'
import * as qs from 'qs'

export const AuthHandler = {
  index: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {

    const code = request.query['code'] ? request.query['code'] : 'error code'
    const state = request.query['state'] ? request.query['state'] : 'error state'
    const storedState = request.state['data'] ? request.state['data'].state : 'error data'

    if (state.toString() !== storedState.toString()) {
      // BOOM not allowd
      return h.redirect('error')
    } else {
      const tokens = await getTokens(code, process.env.ks_redirect_uri, process.env.ks_client_id, process.env.ks_client_secret)
      console.log(tokens)
      if (!tokens) {
        return h.redirect('error')
        // return h.redirect('profile')
      } else {
        return h.redirect(`../?${qs.stringify(tokens)}`)
      }
    }
  }
}

async function getTokens(code, redirect_uri, client_id, client_secret) {
  try {
    const authOptions: AxiosRequestConfig = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_secret: client_secret,
        client_id: client_id
      }
    }
    const response = await axios({...authOptions})
    return {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token
    }
  } catch (error) {
    return false
  }
}
