import React from 'react';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../store';
import securePage from '../hocs/securePage'

export class Builder extends React.Component {
  static async getInitialProps({ req }) {
    return {b: 2}
  }

  render() {
    console.log(this.props.b);
    return (
      <p>Ok</p>
    );
  }
}

export const SecureBuilder = securePage(Builder);

export default withRedux(initStore)(SecureBuilder);