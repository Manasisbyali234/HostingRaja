import React from 'react'
import * as I from './icons.jsx'

export default function MyEmails() {
  return (
    <div className="emails-page">
      <div className="emails-header">
        <h2>My Emails</h2>
        <span className="emails-count">My Emails | 0</span>
      </div>

      <div className="emails-empty">
        <div className="emails-empty-icon">
          <I.Mail width={36} height={36} />
        </div>
        <h3>Level up your domain with email hosting</h3>
        <p>Create professional email addresses using your domain and manage them in one place.</p>
        <button className="btn-grad emails-cta">Add Email Hosting</button>
      </div>
    </div>
  )
}
