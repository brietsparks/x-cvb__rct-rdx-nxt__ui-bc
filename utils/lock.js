import { setSecret } from './auth'

import uuid from 'uuid'

const config = require('../config.json')

const getLock = (options) => {
  const Auth0Lock = require('auth0-lock').default
  return new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_DOMAIN, options)
}

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

const getOptions = ({ container }) => {
  const secret = uuid.v4()
  setSecret(secret)

  return {
    container,
    closable: false,
    auth: {
      responseType: 'token',
      redirectUrl: `${getBaseUrl()}/auth/signed-in`,
      params: {
        // scope: 'openid profile email',
        scope: 'read:messages',
        state: secret,
        audience: config.API_IDENTIFIER,
      }
    }
  }
}

export const show = (container) => getLock(getOptions({container})).show()
export const logout = () => getLock().logout({ returnTo: getBaseUrl() })