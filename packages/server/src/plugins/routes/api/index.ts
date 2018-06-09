import { ServerRoute } from 'hapi'
import { loginRoute } from './login/login.routes'
import { authRoute } from './auth/auth.routes'
import { profileRoute } from './profile/profile.routes'
import { StaticRoute } from './static/static.routes'

export const api: ServerRoute[] = [loginRoute, authRoute, profileRoute, StaticRoute]
