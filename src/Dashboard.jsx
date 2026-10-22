import { useState } from 'react'
import { USER_INITIALS } from './config.js'
import Domains from './Domains.jsx'
import DomainSetup from './DomainSetup.jsx'
import * as I from './icons.jsx'
import MyEmails from './MyEmails.jsx'
import MyOrders from './MyOrders.jsx'

const stats = [
  { icon: I.Globe, label: 'Domains', value: 0 },
  { icon: I.Server, label: 'Hosting', value: 0 },
  { icon: I.Layout, label: 'Websites', value: 0 },
  { icon: I.Mail, label: 'Emails', value: 0 },
  { icon: I.Grid, label: 'Apps', value: 0 },
  { icon: I.Box, label: 'Others', value: 0 },
]

const todos = [
  { name: 'mahalaxmiimplements.com', meta: 'Domain Names - .com', ext: '.com' },
]

const perks = ['Domain Validation', 'Up to 256-bit Encryption', '99.9% Browser Compatibility', 'Same Day Activation']

export default function Dashboard({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(true)
  const [billingOpen, setBillingOpen] = useState(false)
  const [referral, setReferral] = useState(true)
  const [light, setLight] = useState(false)
  const [menu, setMenu] = useState(false)
  const [page, setPage] = useState('home')
  const [setupDomain, setSetupDomain] = useState(null)

  return (
    <div className={'app ' + (light ? 'light' : '')}>
      <header className="topbar">
        <I.Logo size={30} />
        <button className="chip"><I.Eye /> Support PIN</button>
        <div className="spacer" />
        <button className="chip"><I.Gift /> Get rewarded</button>
        <button className="icon-btn" aria-label="Help"><I.Help /></button>
        <button className="icon-btn" aria-label="Notifications"><I.Bell /></button>
        <button className="icon-btn" aria-label="Toggle theme" onClick={() => setLight(!light)}>
          {light ? <I.Moon /> : <I.Sun />}
        </button>
        <div className="avatar-wrap">
          <button className="avatar" onClick={() => setMenu(!menu)}>{USER_INITIALS}</button>
          {menu && (
            <div className="menu">
              <button onClick={onLogout}>Sign out</button>
            </div>
          )}
        </div>
      </header>

      <div className="body">
        <aside className={'sidebar ' + (collapsed ? 'collapsed' : '')}>
          <button className="btn-order"><I.Plus /> <span>Place new order</span></button>

          <nav>
            <a className={'nav ' + (page === 'home' ? 'active' : '')} onClick={() => setPage('home')}>
              <I.Home /> <span>Home</span>
            </a>
            <a className={'nav ' + (page === 'emails' ? 'active' : '')} onClick={() => setPage('emails')}>
              <I.Mail /> <span>My Emails</span>
            </a>
            <a className="nav" onClick={() => setOpen(!open)}>
              <I.Layers /> <span>Products &amp; Services</span>
              <I.ChevUp className={'chev ' + (open ? '' : 'down')} width={16} height={16} />
            </a>
            {open && !collapsed && (
              <div className="sub">
                <a className={page === 'domains' ? 'sub-active' : ''} onClick={() => setPage('domains')}>Domains</a>
              </div>
            )}
            <a className="nav" onClick={() => setBillingOpen(!billingOpen)}>
              <I.Box /> <span>Billing</span>
              <I.ChevUp className={'chev ' + (billingOpen ? '' : 'down')} width={16} height={16} />
            </a>
            {billingOpen && !collapsed && (
              <div className="sub">
                <a className={page === 'orders' ? 'sub-active' : ''} onClick={() => setPage('orders')}>Orders</a>
              </div>
            )}
          </nav>

          {referral && !collapsed && (
            <div className="referral">
              <button className="x" onClick={() => setReferral(false)} aria-label="Dismiss"><I.X width={16} height={16} /></button>
              <h4>Refer friends, get rewards</h4>
              <p>Earn with every friend that signs up through your link</p>
              <button className="share">Start sharing now!</button>
            </div>
          )}

          <button className="collapse" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse sidebar">
            <I.ChevsLeft width={16} height={16} style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }} />
          </button>
        </aside>

        <main className="main">
          {setupDomain ? (
            <DomainSetup
              domain={setupDomain.name}
              ext={setupDomain.ext}
              onBack={() => setSetupDomain(null)}
              onHome={() => { setSetupDomain(null); setPage('home') }}
            />
          ) : page === 'domains' ? (
            <Domains onHome={() => setPage('home')} />
          ) : page === 'emails' ? (
            <MyEmails />
          ) : page === 'orders' ? (
            <MyOrders onHome={() => setPage('home')} />
          ) : (
            <>
              <div className="welcome">
                <h2>Welcome, mahalaxmiimplements</h2>
                <button className="btn-dark"><I.Chat /> Manage support tickets</button>
              </div>

              <section className="stats">
                {stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <s.icon width={22} height={22} />
                    <span className="stat-label">{s.label}</span>
                    <b>{s.value}</b>
                  </div>
                ))}
              </section>

              <section className="grid">
                <div className="card todos">
                  <div className="card-head">
                    <h3>Todos</h3>
                    <span className="muted">2/6 completed</span>
                  </div>

                  <ul className="todo-list">
                    {todos.map((t) => (
                      <li key={t.name}>
                        <div>
                          <strong>{t.name}</strong>
                          <small>{t.meta}</small>
                        </div>

                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card reco">
                  <span className="tag">RECOMMENDED</span>
                  <div className="reco-box">
                    <div>
                      <h4>Secure your domain with Positive SSL</h4>
                      <p>Add trust and encryption to your online business.</p>
                    </div>
                    <button className="btn-grad small">Add SSL</button>
                  </div>
                  <ul className="perks">
                    {perks.map((p) => (
                      <li key={p}><I.Check width={18} height={18} /> {p}</li>
                    ))}
                  </ul>
                  <p className="muted small-text">Need help securing your domains?</p>
                  
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      <button className="fab" aria-label="Chat with support"><I.Chat width={26} height={26} /></button>
    </div>
  )
}
