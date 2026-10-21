import React, { useState } from 'react'
import { USERS } from './config.js'
import { Logo, Mail, Lock } from './icons.jsx'

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (newPassword.length < 6) return setError('Password must be at least 6 characters.')
    if (newPassword !== confirm) return setError('Passwords do not match.')
    const existing = USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
    if (existing) {
      existing.password = newPassword
    } else {
      USERS.push({ email: email.trim(), password: newPassword })
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="auth-wrap">
        <div className="auth-card">
          <Logo size={34} />
          <h1>Password set!</h1>
          <p className="muted">You can now sign in with <b>{email}</b> and your new password.</p>
          <button className="btn-grad" onClick={onBack}>Back to sign in</button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <Logo size={34} />
        <h1>Reset / Set password</h1>
        <p className="muted">Enter your email and choose a new password.</p>

        <label className="field">
          <span>Email address</span>
          <div className="input">
            <Mail width={18} height={18} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
        </label>

        <label className="field">
          <span>New password</span>
          <div className="input">
            <Lock width={18} height={18} />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
        </label>

        <label className="field">
          <span>Confirm password</span>
          <div className="input">
            <Lock width={18} height={18} />
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </div>
        </label>

        {error && <div className="error">{error}</div>}

        <button className="btn-grad" type="submit">Set password</button>
        <button type="button" className="link-btn" onClick={onBack}>← Back to sign in</button>
      </form>
    </div>
  )
}
