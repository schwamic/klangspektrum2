import * as Hapi from 'hapi'
import * as qs from 'qs'

/**
 * loads user-profile-data
 * @type {{index: (request: Request, h: ResponseToolkit) => Promise<ResponseObject>}}
 */
export const ProfileHandler = {
  index: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const access_token = request.payload['token']
    const user = request.payload['user']
    const options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    }


    // 1. save tokens in frontend
    // 2. post tokens to backend via guard to load profile-data
    // 3. response to frontend


    return {'profile': access_token+', '+user}
  }
}
