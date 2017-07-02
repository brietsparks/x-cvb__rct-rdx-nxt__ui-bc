import React, { PropTypes } from 'react'
import Router from 'next/router'

import { setTokens, checkSecret, extractInfoFromHash } from '../../utils/auth'

export default class SignedIn extends React.Component {
  static propTypes = {
    url: PropTypes.object.isRequired
  }

  componentDidMount () {
    const {idToken, accessToken, secret} = extractInfoFromHash()
    if (!checkSecret(secret) || !idToken || !accessToken) {
      console.error('Something happened with the Sign In request')
    }
    setTokens(idToken, accessToken)
    Router.push('/')
  }
  
  render () {
    return null
  }
}