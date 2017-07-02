import React from 'react';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../store';
import securePage from '../hocs/securePage';

import fetch from 'isomorphic-unfetch';

export class Builder extends React.Component {
  static async getInitialProps({ req }) {
    return {b: 2}
  }

  render() {
    this.testFetch().then(a => console.log(a));
    return (
      <p>Ok</p>
    );
  }

  async testFetch() {
    // get access token
    const accessToken = localStorage.getItem('access_token');
    console.log(localStorage);
    if (!accessToken) {
      throw new Error('No access token found');
    }

    // set headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    headers['Authorization'] = 'Bearer ' + accessToken;

    const res = await fetch(`http://localhost:3001/api/private`, { headers });
    return res;
  }
}

export const SecureBuilder = securePage(Builder);

export default withRedux(initStore)(SecureBuilder);