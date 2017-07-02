import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

// to be used for both local store and cookies
const STORAGE_KEYS = {
  accessToken: 'access_token',
  secret: 'secret',
  logout: 'logout'
};

const getQueryParams = () => {
  const params = {}
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}

export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined
  }

  const {access_token, state} = getQueryParams()
  return {accessToken: access_token, secret: state}
}

export const setToken = (accessToken) => {
  if (!process.browser) {
    return
  }

  window.localStorage.setItem(STORAGE_KEYS.accessToken, accessToken)
  Cookie.set(STORAGE_KEYS.accessToken, accessToken)
}

export const unsetToken = () => {
  if (!process.browser) {
    return
  }

  window.localStorage.removeItem(STORAGE_KEYS.accessToken)
  window.localStorage.removeItem(STORAGE_KEYS.secret)
  Cookie.remove(STORAGE_KEYS.accessToken)

  window.localStorage.setItem(STORAGE_KEYS.logout, Date.now())
}

export const getAccessTokenFromCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const accessTokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${STORAGE_KEYS.accessToken}=`))
  if (!accessTokenCookie) {
    return undefined
  }
  const token = accessTokenCookie.split('=')[1]
  return jwtDecode(token)
}

export const getAccessTokenFromLocalStorage =  () => {
  return window.localStorage[STORAGE_KEYS.accessToken]
  // return json ? JSON.parse(json) : undefined
}

export const setSecret = (secret) => window.localStorage.setItem(STORAGE_KEYS.secret, secret)

export const checkSecret = (secret) => window.localStorage.secret === secret