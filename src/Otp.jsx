import React, { useRef, useState } from 'react'
import { DEFAULT_OTP } from './config.js'
import { Logo, Shield } from './icons.jsx'

export default function Otp({ email, onBack, onSuccess }) {
  const [digits, setDigits] = useState(DEFAULT_OTP.split(''))
  const [error, setError] = useState('')
  const refs = useRef([])

  const setAt = (i, v) => {
    const val = v.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = val
    setDigits(next)
    if (val && i < 5) refs.current[i + 1]?.focus()
  }

  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const onPaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!text) return
    e.preventDefault()
    setDigits(text.padEnd(6, ' ').split('').map((c) => (c === ' ' ? '' : c)))
  }

  const submit = (e) => {
    e.preventDefault()
    if (digits.join('') === DEFAULT_OTP) onSuccess()
    else setError('Incorrect code. Please try again.')
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <Logo size={34} />
        <div className="otp-icon"><Shield width={26} height={26} /></div>
        <h1>Verify it's you</h1>
        <p className="muted">
          We sent a 6-digit code to <b>{email}</b>.
        </p>

        <div className="otp-row" onPaste={onPaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              className="otp-box"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
            />
          ))}
        </div>

        {error && <div className="error">{error}</div>}

        <button className="btn-grad" type="submit">Verify &amp; continue</button>
        <button type="button" className="link-btn" onClick={onBack}>← Back to sign in</button>
        <p className="hint">Demo mode: the default code {DEFAULT_OTP} is pre-filled.</p>
      </form>
    </div>
  )
}
