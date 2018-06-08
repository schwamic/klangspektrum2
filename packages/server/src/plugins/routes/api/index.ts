import { ServerRoute } from 'hapi'
import { loginRoute } from './login/login.routes'
import { authRoute } from './auth/auth.routes'
import { profileRoute } from './profile/profile.routes'
import { AppRoute } from './app/app.routes'

export const api: ServerRoute[] = [loginRoute, authRoute, profileRoute, AppRoute]
