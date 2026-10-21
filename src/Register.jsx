import React, { useState } from 'react'
import { USERS } from './config.js'
import { Logo, Mail, Lock } from './icons.jsx'

export default function Register({ onBack, onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    if (password !== confirm) return setError('Passwords do not match.')
    const exists = USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
    if (exists) return setError('An account with this email already exists.')
    setLoading(true)
    setTimeout(() => {
      USERS.push({ email: email.trim(), password })
      setLoading(false)
      onSuccess(email.trim())
    }, 600)
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <Logo size={34} />
        <h1>Create your account</h1>
        <p className="muted">Set up your email and password to get started.</p>

        <label className="field">
          <span>Email address</span>
          <div className="input">
            <Mail width={18} height={18} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
        </label>

        <label className="field">
          <span>Password</span>
          <div className="input">
            <Lock width={18} height={18} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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

        <button className="btn-grad" type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>

        <p className="hint">
          Already have an account?{' '}
          <button type="button" className="link-btn inline-link" onClick={onBack}>Sign in</button>
        </p>
      </form>
    </div>
  )
}
