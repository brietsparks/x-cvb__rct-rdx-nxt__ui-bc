import React, { PropTypes } from 'react'
import Link from 'next/link'

const links = [
  { href: '/', text: 'Home' },
  { href: '/builder', text: 'Builder', authRequired: true },
  // { href: '/viewer', text: 'Viewer', authRequired: true },
  { href: '/auth/sign-in', text: 'Login or Register', anonymousOnly: true },
  { href: '/auth/sign-off', text: 'Logout', authRequired: true }
]

function getAllowedLinks (isAuthenticated) {
  return links.filter(l => !l.authRequired || (l.authRequired && isAuthenticated))
              .filter(l => !isAuthenticated || (isAuthenticated && !l.anonymousOnly))
}

const Header = ({ isAuthenticated, currentUrl }) => (
  <div>
    {getAllowedLinks(isAuthenticated).map(l => (
      <Link key={l.href} href={l.href}>
        <a className={currentUrl === l.href ? 'active' : ''}>
          {l.text}
        </a>
      </Link>
    ))}
    <style jsx>{`
      div {
        display: flex;
        margin-bottom: 20px;
      }

      a {
        margin-right: 20px;
        font-size: 14px;
        color: #999;
        text-decoration: none;
        text-transform: uppercase;
        padding-top: 2px;
        padding-bottom: 2px;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        transition: color 0.25s;
        font-weight: 400;
      }

      a.active {
        color: #333;
        border-color: #333;
        font-weight: 600;
      }

      a:hover {
        color: #333;
      }
    `}</style>
  </div>
)

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  currentUrl: PropTypes.string.isRequired
}

export default Header