import * as Hapi from 'hapi'
import * as qs from 'qs'
import axios, { AxiosRequestConfig } from 'axios'

import {Statuscodes} from '../../../../utils/http-utils'

/**
 * handles callback from spotify-auth-login
 * @type {{index: (request: Request, h: ResponseToolkit) => Promise<ResponseObject>}}
 */
export const AuthHandler = {
  index: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    try{
      const code = request.query['code']
      const error = request.query['error']
      const state = request.query['state'].toString()
      const storedState = request.state['data'].state.toString()

      if(error) {
        request.log(['error', 'auth-handler:index'], error)
        return h.redirect(`../?${qs.stringify({error: Statuscodes.Unauthorized})}`)
      }

      else if (state !== storedState) {
        request.log(['error', 'auth-handler:index'], 'State !== storedState')
        return h.redirect(`../?${qs.stringify({error: Statuscodes.Unauthorized})}`)
      }

      else {
        const tokens = await getTokens(code, process.env.ks_redirect_uri, process.env.ks_client_id, process.env.ks_client_secret)
        if (!tokens) {
          request.log(['error', 'auth-handler:index'], 'getTokens()') // todo log real error
          return h.redirect(`../?${qs.stringify({error: Statuscodes.Unauthorized})}`)
        } else {
          return h.redirect(`../?${qs.stringify(tokens)}`)
        }
      }
    }
    catch(error){
      request.log(['error', 'auth-handler:index'], error)
      return h.redirect(`../?${qs.stringify({error: Statuscodes.InternalServerError})}`)
    }
  }
}

/**
 * helper function to request tokens from spotify-api
 * @param code
 * @param redirect_uri
 * @param client_id
 * @param client_secret
 * @returns {Promise<any>}
 */
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
    return null
  }
}
