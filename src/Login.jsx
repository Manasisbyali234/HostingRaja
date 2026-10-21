import React, { useState } from 'react'
import { USERS } from './config.js'
import { Logo, Mail, Lock } from './icons.jsx'

export default function Login({ onSuccess, onForgot, onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const match = USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      )
      if (match) {
        onSuccess(email.trim())
      } else {
        setError('Invalid email or password.')
      }
    }, 600)
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <Logo size={34} />
        <h1>Sign in to your account</h1>
        <p className="muted">Manage your domains, hosting and emails in one place.</p>

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

        <button type="button" className="link-btn forgot-link" onClick={onForgot}>Forgot password?</button>

        {error && <div className="error">{error}</div>}

        <button className="btn-grad" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="hint">
          Don't have an account?{' '}
          <button type="button" className="link-btn inline-link" onClick={onRegister}>Create one</button>
        </p>
      </form>
    </div>
  )
}
