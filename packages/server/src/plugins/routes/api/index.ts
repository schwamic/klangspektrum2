import { ServerRoute } from 'hapi'
import { loginRoute } from './login/login.routes'
import { authRoute } from './auth/auth.routes'

export const api: ServerRoute[] = [loginRoute, authRoute]
