import React, { useState } from 'react'
import Login from './Login.jsx'
import Otp from './Otp.jsx'
import Dashboard from './Dashboard.jsx'
import Register from './Register.jsx'
import ForgotPassword from './ForgotPassword.jsx'

export default function App() {
  const [stage, setStage] = useState(() => {
    try {
      return sessionStorage.getItem('hn_auth') === '1' ? 'dashboard' : 'login'
    } catch {
      return 'login'
    }
  })
  const [email, setEmail] = useState('')

  const finish = () => {
    try { sessionStorage.setItem('hn_auth', '1') } catch {}
    setStage('dashboard')
  }
  const logout = () => {
    try { sessionStorage.removeItem('hn_auth') } catch {}
    setStage('login')
  }

  if (stage === 'login') return (
    <Login
      onSuccess={(e) => { setEmail(e); setStage('otp') }}
      onForgot={() => setStage('forgot')}
      onRegister={() => setStage('register')}
    />
  )
  if (stage === 'otp') return <Otp email={email} onBack={() => setStage('login')} onSuccess={finish} />
  if (stage === 'register') return <Register onBack={() => setStage('login')} onSuccess={(e) => { setEmail(e); setStage('otp') }} />
  if (stage === 'forgot') return <ForgotPassword onBack={() => setStage('login')} />
  return <Dashboard onLogout={logout} />
}
