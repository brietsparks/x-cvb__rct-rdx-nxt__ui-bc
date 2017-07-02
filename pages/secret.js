import React, { PropTypes } from 'react'

import securePage from '../hocs/securePage'

const Secret = ({ accessToken }) => (
  <div>
    <p>
      Access token: {{ accessToken }}
    </p>
    <style jsx>{`
      p {
        font-size: 20px;
        font-weight: 200;
        line-height: 30px;
      }
    `}</style>
  </div>
)

Secret.propTypes = {
  loggedUser: PropTypes.object.isRequired
}

export default securePage(Secret)