import React, { PropTypes } from 'react'
import Router from 'next/router'

import { setToken, checkSecret, extractInfoFromHash } from '../../utils/auth'

export default class SignedIn extends React.Component {
  static propTypes = {
    url: PropTypes.object.isRequired
  }

  componentDidMount () {
    const {accessToken, secret} = extractInfoFromHash()
    if (!checkSecret(secret) || !accessToken) {
      console.error('Something happened with the Sign In request')
    }

    setToken(accessToken);
    Router.push('/')
  }
  
  render () {
    return null
  }
}